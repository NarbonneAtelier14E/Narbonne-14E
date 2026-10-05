function corsHeaders(origin, allowed) {
  const ok = allowed.includes('*') || allowed.includes(origin);
  return {
    'Access-Control-Allow-Origin': ok ? origin : (allowed.includes('*') ? '*' : 'null'),
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-App-Pin',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function parseAllowed(value='') {
  return String(value).split(',').map(x => x.trim()).filter(Boolean);
}

function json(data, status=200, headers={}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {'Content-Type':'application/json; charset=utf-8', ...headers}
  });
}

function validEmail(value='') {
  return /^\S+@\S+\.\S+$/.test(String(value).trim());
}

function escapeHtml(value='') {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function cleanTag(value='') {
  return String(value).replace(/[^A-Za-z0-9_-]/g,'_').slice(0,200) || 'na14e';
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = parseAllowed(env.ALLOWED_ORIGINS || '*');
    const cors = corsHeaders(origin, allowed);

    if (request.method === 'OPTIONS') return new Response(null, {status: 204, headers: cors});
    if (request.method !== 'POST') return json({error:'Méthode non autorisée'}, 405, cors);
    if (!allowed.includes('*') && !allowed.includes(origin)) return json({error:'Origine non autorisée'}, 403, cors);

    if (env.APP_PIN) {
      const pin = request.headers.get('X-App-Pin') || '';
      if (pin !== env.APP_PIN) return json({error:'Code d’envoi incorrect'}, 401, cors);
    }

    let body;
    try { body = await request.json(); }
    catch { return json({error:'Corps JSON invalide'}, 400, cors); }

    const to = String(body.to || '').trim();
    const cc = body.cc ? String(body.cc).trim() : '';
    const subject = String(body.subject || '').trim().slice(0, 300);
    const message = String(body.message || '').trim().slice(0, 10000);
    const filename = String(body.filename || 'rapport.pdf').replace(/[^A-Za-z0-9._-]/g,'_').slice(0,180);
    const pdfBase64 = String(body.pdfBase64 || '');
    const metadata = body.metadata && typeof body.metadata === 'object' ? body.metadata : {};

    if (!validEmail(to)) return json({error:'Destinataire invalide'}, 400, cors);
    if (cc && !validEmail(cc)) return json({error:'Adresse CC invalide'}, 400, cors);
    if (!subject) return json({error:'Objet manquant'}, 400, cors);
    if (!pdfBase64 || pdfBase64.length < 100) return json({error:'PDF manquant'}, 400, cors);
    if (pdfBase64.length > 18_000_000) return json({error:'PDF trop volumineux'}, 413, cors);
    if (!env.RESEND_API_KEY) return json({error:'RESEND_API_KEY non configurée'}, 500, cors);
    if (!env.FROM_EMAIL) return json({error:'FROM_EMAIL non configuré'}, 500, cors);

    const lines = message.split(/\r?\n/).map(x => escapeHtml(x));
    const ref = escapeHtml(metadata.ref || '');
    const client = escapeHtml(metadata.client || '');
    const immat = escapeHtml(metadata.immat || '');
    const tech = escapeHtml(metadata.technicien || '');
    const vendeur = escapeHtml(metadata.vendeur || '');
    const avis = escapeHtml(metadata.avis || '');

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#18313d;line-height:1.5">
        <div style="background:#073e5b;color:#fff;padding:18px 22px;border-radius:10px 10px 0 0">
          <div style="font-size:18px;font-weight:700">Narbonne Accessoires - Atelier 14E</div>
          <div style="font-size:12px;color:#d6e7ee">Rapport de faisabilité technique ${ref}</div>
        </div>
        <div style="border:1px solid #d9e5eb;border-top:0;padding:20px;border-radius:0 0 10px 10px">
          <p>${lines.join('<br>')}</p>
          <table style="border-collapse:collapse;width:100%;font-size:12px;margin-top:18px">
            <tr><td style="padding:6px;border-bottom:1px solid #e7eef2"><b>Client</b></td><td style="padding:6px;border-bottom:1px solid #e7eef2">${client}</td></tr>
            <tr><td style="padding:6px;border-bottom:1px solid #e7eef2"><b>Immatriculation</b></td><td style="padding:6px;border-bottom:1px solid #e7eef2">${immat}</td></tr>
            <tr><td style="padding:6px;border-bottom:1px solid #e7eef2"><b>Vendeur</b></td><td style="padding:6px;border-bottom:1px solid #e7eef2">${vendeur}</td></tr>
            <tr><td style="padding:6px;border-bottom:1px solid #e7eef2"><b>Technicien</b></td><td style="padding:6px;border-bottom:1px solid #e7eef2">${tech}</td></tr>
            <tr><td style="padding:6px"><b>Avis</b></td><td style="padding:6px">${avis}</td></tr>
          </table>
          <p style="font-size:11px;color:#6c7f89;margin-top:18px">Le rapport PDF est joint à cet e-mail.</p>
        </div>
      </div>`;

    const payload = {
      from: env.FROM_EMAIL,
      to: [to],
      subject,
      html,
      attachments: [{filename, content: pdfBase64, content_type:'application/pdf'}],
      tags: [
        {name:'app', value:'atelier14e'},
        {name:'dossier', value:cleanTag(metadata.ref || 'na14e')}
      ]
    };
    if (cc) payload.cc = [cc];
    if (env.ARCHIVE_EMAIL && validEmail(env.ARCHIVE_EMAIL)) payload.bcc = [env.ARCHIVE_EMAIL];
    if (env.REPLY_TO && validEmail(env.REPLY_TO)) payload.reply_to = env.REPLY_TO;

    const resend = await fetch('https://api.resend.com/emails', {
      method:'POST',
      headers:{
        'Authorization':`Bearer ${env.RESEND_API_KEY}`,
        'Content-Type':'application/json',
        'Idempotency-Key': `na14e/${cleanTag(metadata.ref || 'no-ref')}/${Date.now()}`
      },
      body:JSON.stringify(payload)
    });

    const result = await resend.json().catch(() => ({}));
    if (!resend.ok) return json({error: result.message || result.name || `Erreur fournisseur e-mail (${resend.status})`}, 502, cors);
    return json({ok:true, id:result.id || null}, 200, cors);
  }
};
