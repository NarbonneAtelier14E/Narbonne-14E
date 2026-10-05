(() => {
  'use strict';

  const STORAGE = {
    draft: 'na14e:feasibility:draft:v1',
    dossiers: 'na14e:feasibility:dossiers:v1',
    settings: 'na14e:feasibility:settings:v1'
  };

  const VEHICLE_BRANDS = [
    'Adria','Ahorn Camp','Autostar','Bavaria','Benimar','Bürstner','Campérêve','Carado','Carthago','Challenger','Chausson','CI','Dethleffs','Elnagh','Etrusco','Fleurette','Florium','Font Vendôme','Forster','Frankia','Giottiline','Globecar','Hobby','Hymer','Itineo','Joa Camp','Knaus','Laika','Le Voyageur','McLouis','Mobilvetta','Morelo','Niesmann + Bischoff','Notin','Pilote','Pössl','Rapido','Rimor','Roller Team','Sunlight','Weinsberg','Westfalia','Wingamm','Yucon','Autre / constructeur artisanal'
  ];
  const BASE_VEHICLES = [
    'Fiat Ducato','Peugeot Boxer','Citroën Jumper','Ford Transit','Mercedes-Benz Sprinter','Renault Master','Iveco Daily','Volkswagen Crafter','Volkswagen Transporter','MAN TGE','Opel Movano','Toyota Proace','Peugeot Expert','Citroën Jumpy','Renault Trafic','Ford Transit Custom','Mercedes-Benz Vito','Volkswagen California / Transporter'
  ];

  const ACCESSORIES = [
    ['Suspensions','suspension'],['Caméra de recul','camera'],['Panneau solaire','solar'],['Climatisation','snow'],
    ['Convertisseur 230 V','inverter'],['Batterie lithium / AGM','battery'],['Porte-vélo','bike'],['Caméra 360°','camera360'],
    ['Installation GPL / gaz','gas'],['Attelage','tow'],['Store / auvent','awning'],['Vérins','jack'],
    ['Antenne TV / SAT','antenna'],['Routeur 4G / 5G','wifi'],['Chauffage','heat'],['Marchepied','step'],
    ['Réfrigérateur','fridge'],['Circuit 12 V / 230 V','electric'],['Eau / pompe / réservoir','water'],['Alarme / antivol','alarm']
  ];

  const ICONS = {
    suspension:'<svg viewBox="0 0 32 32"><path d="M5 9h22M7 23h18M10 9v4l3 2-3 2 3 2-3 4M22 9v4l-3 2 3 2-3 2 3 4"/></svg>',
    camera:'<svg viewBox="0 0 32 32"><rect x="5" y="9" width="18" height="14" rx="3"/><path d="m23 13 5-3v12l-5-3"/><circle cx="14" cy="16" r="4"/></svg>',
    solar:'<svg viewBox="0 0 32 32"><path d="M7 11h18l3 12H4zM9 15h16M7 19h20M12 11l-1 12M20 11l1 12M16 5v3M8 7l2 2M24 7l-2 2"/></svg>',
    snow:'<svg viewBox="0 0 32 32"><path d="M16 4v24M6 10l20 12M26 10 6 22M12 6l4 4 4-4M12 26l4-4 4 4M5 14l6 1-2-6M27 18l-6-1 2 6M27 14l-6 1 2-6M5 18l6-1-2 6"/></svg>',
    inverter:'<svg viewBox="0 0 32 32"><rect x="4" y="8" width="24" height="16" rx="3"/><path d="M8 16c2-4 4-4 6 0s4 4 6 0 4-4 5 0"/></svg>',
    battery:'<svg viewBox="0 0 32 32"><rect x="5" y="9" width="22" height="16" rx="2"/><path d="M11 9V6h4v3M19 9V6h4v3M10 17h5M12.5 14.5v5M20 17h4"/></svg>',
    bike:'<svg viewBox="0 0 32 32"><circle cx="9" cy="22" r="5"/><circle cx="24" cy="22" r="5"/><path d="m9 22 6-10 5 10H9l6-10h6M18 9h5"/></svg>',
    camera360:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="6"/><path d="M3 16c0-7 6-13 13-13 4 0 8 2 10 5M29 16c0 7-6 13-13 13-4 0-8-2-10-5M24 4l2 4-4 1M8 28l-2-4 4-1"/></svg>',
    gas:'<svg viewBox="0 0 32 32"><path d="M11 6h10l2 5v15H9V11zM12 6V3h8v3M12 15h8M16 18v5"/></svg>',
    tow:'<svg viewBox="0 0 32 32"><path d="M5 11h18v8H5zM23 15h4v6M27 21a3 3 0 1 1-3 3"/><circle cx="10" cy="23" r="2"/></svg>',
    awning:'<svg viewBox="0 0 32 32"><path d="M5 10h22l-3 6H8zM9 16v11M23 16v11M12 22h8"/></svg>',
    jack:'<svg viewBox="0 0 32 32"><path d="M7 7h18M10 7l4 7-5 7M22 7l-4 7 5 7M8 22h16M16 14v13M11 27h10"/></svg>',
    antenna:'<svg viewBox="0 0 32 32"><path d="M16 27V15M11 27h10M9 12a10 10 0 0 1 14 0M5 8a15 15 0 0 1 22 0M16 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/></svg>',
    wifi:'<svg viewBox="0 0 32 32"><path d="M5 12a16 16 0 0 1 22 0M9 17a10 10 0 0 1 14 0M13 22a4 4 0 0 1 6 0"/><circle cx="16" cy="26" r="1"/></svg>',
    heat:'<svg viewBox="0 0 32 32"><path d="M10 28c-5-5 1-8 0-13 4 2 5 5 5 7 4-5 2-10 6-16 6 8 5 17 1 22-3 4-9 4-12 0z"/></svg>',
    step:'<svg viewBox="0 0 32 32"><path d="M6 10h20v6H6zM10 16v5h16v6H10z"/></svg>',
    fridge:'<svg viewBox="0 0 32 32"><rect x="8" y="4" width="16" height="24" rx="2"/><path d="M8 14h16M12 8v3M12 18v4"/></svg>',
    electric:'<svg viewBox="0 0 32 32"><path d="m18 3-9 15h7l-2 11 9-15h-7z"/></svg>',
    water:'<svg viewBox="0 0 32 32"><path d="M16 4C12 10 8 15 8 20a8 8 0 0 0 16 0c0-5-4-10-8-16z"/></svg>',
    alarm:'<svg viewBox="0 0 32 32"><path d="M8 23h16l-2-3V13a6 6 0 0 0-12 0v7zM13 27h6M5 10 3 8M27 10l2-2M16 4V2"/></svg>'
  };

  const $ = sel => document.querySelector(sel);
  const $$ = sel => [...document.querySelectorAll(sel)];
  const form = $('#feasibilityForm');
  const canvas = $('#drawingCanvas');
  const ctx = canvas.getContext('2d');
  let deferredPrompt = null;
  let drawing = false;
  let drawTool = 'pen';
  let undoStack = [];
  let saveTimer = null;
  let currentRef = '';
  let workflowState = {status:'draft', validatedAt:null, emailSentAt:null, emailRecipient:null, emailMessageId:null, sendHistory:[]};

  function todayISO(){
    const d = new Date();
    const z = n => String(n).padStart(2,'0');
    return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}`;
  }
  function generateRef(){
    const d = new Date(); const z=n=>String(n).padStart(2,'0');
    return `FAI-14E-${d.getFullYear()}${z(d.getMonth()+1)}${z(d.getDate())}-${z(d.getHours())}${z(d.getMinutes())}${z(d.getSeconds())}`;
  }
  function escapeHtml(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove('show'),2300)}

  function populateLists(){
    $('#vehicleBrands').innerHTML=VEHICLE_BRANDS.map(x=>`<option value="${escapeHtml(x)}"></option>`).join('');
    $('#baseVehicles').innerHTML=BASE_VEHICLES.map(x=>`<option value="${escapeHtml(x)}"></option>`).join('');
  }

  function renderAccessories(){
    $('#accessoryGrid').innerHTML = ACCESSORIES.map(([name,icon],i)=>`
      <article class="accessory-card" data-accessory="${escapeHtml(name)}">
        <div class="accessory-icon">${ICONS[icon] || ICONS.electric}</div>
        <div class="accessory-main"><strong>${escapeHtml(name)}</strong><div class="mini-checks">
          <label><input type="checkbox" name="acc_${i}_devis" data-acc-index="${i}" data-acc-kind="devis"> Devis</label>
          <label><input type="checkbox" name="acc_${i}_commande" data-acc-index="${i}" data-acc-kind="commande"> Commande</label>
        </div></div>
      </article>`).join('');
  }

  function updateAccessoryState(){
    let selected=0;
    $$('.accessory-card').forEach((card,i)=>{
      const active = !!form.querySelector(`[name="acc_${i}_devis"]`)?.checked || !!form.querySelector(`[name="acc_${i}_commande"]`)?.checked;
      card.classList.toggle('selected',active); if(active) selected++;
    });
    $('#accessoryCount').textContent=selected;
  }

  function formatPhone(value){
    let raw = value.trim().replace(/[^\d+]/g,'');
    if(raw.startsWith('+33')) raw = '0' + raw.slice(3);
    else if(raw.startsWith('0033')) raw='0'+raw.slice(4);
    raw = raw.replace(/\D/g,'').slice(0,10);
    if(raw && raw[0] !== '0' && raw.length <= 9) raw = '0' + raw;
    return raw.replace(/(\d{2})(?=\d)/g,'$1 ').trim();
  }
  function normalizedPhone(value){
    const digits = value.replace(/\D/g,'');
    if(digits.length===10 && digits.startsWith('0')) return '+33'+digits.slice(1);
    if(digits.length===9) return '+33'+digits;
    return '';
  }

  function formatPlate(value){
    const raw=value.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,12);
    // SIV standard and provisional patterns such as AA123AA / WW123AA
    let m=raw.match(/^([A-Z]{1,2})(\d{1,3})([A-Z]{0,3})$/);
    if(m && m[2].length===3 && m[3].length>=2) return `${m[1]}-${m[2]}-${m[3]}`;
    // Old FNI: 1234 AB 33 / 123 AB 2A / 1234 ABC 974
    m=raw.match(/^(\d{1,4})([A-Z]{1,3})(\d{2,3}|2A|2B)$/);
    if(m) return `${m[1]} ${m[2]} ${m[3]}`;
    return raw;
  }

  function setupFormatters(){
    $('#telephone').addEventListener('input',e=>{
      const pos=e.target.selectionStart; e.target.value=formatPhone(e.target.value);
      const n=normalizedPhone(e.target.value); $('#phoneNormalized').textContent=n ? `Format international : ${n}` : '';
    });
    $('#immat').addEventListener('input',e=>{e.target.value=formatPlate(e.target.value)});
    $('#vin').addEventListener('input',e=>{e.target.value=e.target.value.toUpperCase().replace(/\s+/g,'')});
  }

  function resizeCanvas(preserve=true){
    const wrap=$('#drawingWrap');
    const rect=wrap.getBoundingClientRect();
    if(rect.width<10 || rect.height<10) return;
    const old = preserve && canvas.width ? canvas.toDataURL() : null;
    const ratio=Math.max(1,window.devicePixelRatio||1);
    canvas.width=Math.round(rect.width*ratio); canvas.height=Math.round(rect.height*ratio);
    ctx.setTransform(ratio,0,0,ratio,0,0); ctx.lineCap='round';ctx.lineJoin='round';
    if(old){const img=new Image();img.onload=()=>ctx.drawImage(img,0,0,rect.width,rect.height);img.src=old;}
  }

  function getPoint(evt){const r=canvas.getBoundingClientRect();const t=evt.touches?.[0]||evt;return {x:t.clientX-r.left,y:t.clientY-r.top};}
  function pushUndo(){try{undoStack.push(canvas.toDataURL());if(undoStack.length>20)undoStack.shift();}catch{} }
  function beginDraw(evt){evt.preventDefault();pushUndo();drawing=true;const p=getPoint(evt);ctx.beginPath();ctx.moveTo(p.x,p.y);}
  function moveDraw(evt){if(!drawing)return;evt.preventDefault();const p=getPoint(evt);ctx.globalCompositeOperation=drawTool==='eraser'?'destination-out':'source-over';ctx.strokeStyle=drawTool==='eraser'?'rgba(0,0,0,1)':'#0877bd';ctx.lineWidth=drawTool==='eraser'?22:3.2;ctx.lineTo(p.x,p.y);ctx.stroke();}
  function endDraw(){if(!drawing)return;drawing=false;ctx.closePath();ctx.globalCompositeOperation='source-over';scheduleSave();}
  function setupDrawing(){
    resizeCanvas(false); window.addEventListener('resize',()=>resizeCanvas(true));
    ['pointerdown'].forEach(ev=>canvas.addEventListener(ev,beginDraw));
    ['pointermove'].forEach(ev=>canvas.addEventListener(ev,moveDraw));
    ['pointerup','pointercancel','pointerleave'].forEach(ev=>canvas.addEventListener(ev,endDraw));
    $$('.tool-btn[data-tool]').forEach(b=>b.addEventListener('click',()=>{drawTool=b.dataset.tool;$$('.tool-btn[data-tool]').forEach(x=>x.classList.toggle('active',x===b));}));
    $('#clearDraw').addEventListener('click',()=>{pushUndo();ctx.clearRect(0,0,canvas.width,canvas.height);scheduleSave();});
    $('#undoDraw').addEventListener('click',()=>{const data=undoStack.pop();if(!data)return;const img=new Image();img.onload=()=>{const r=canvas.getBoundingClientRect();ctx.clearRect(0,0,r.width,r.height);ctx.drawImage(img,0,0,r.width,r.height);scheduleSave();};img.src=data;});
  }

  function formDataObject(){
    const fd=new FormData(form); const data={};
    for(const [k,v] of fd.entries()) data[k]=v;
    form.querySelectorAll('input[type="checkbox"]').forEach(x=>data[x.name]=x.checked);
    data.phoneInternational=normalizedPhone($('#telephone').value);
    data.drawing=canvas.width?canvas.toDataURL('image/png'):'';
    data.updatedAt=new Date().toISOString(); data.ref=$('#dossierRef').value;
    data.workflowStatus=workflowState.status; data.validatedAt=workflowState.validatedAt; data.emailSentAt=workflowState.emailSentAt; data.emailRecipient=workflowState.emailRecipient; data.emailMessageId=workflowState.emailMessageId; data.sendHistory=workflowState.sendHistory||[];
    data.accessories=ACCESSORIES.map(([name],i)=>({name,devis:!!form.querySelector(`[name="acc_${i}_devis"]`)?.checked,commande:!!form.querySelector(`[name="acc_${i}_commande"]`)?.checked})).filter(x=>x.devis||x.commande);
    return data;
  }

  function restoreForm(data){
    if(!data)return;
    for(const [k,v] of Object.entries(data)){
      if(['drawing','accessories','phoneInternational','updatedAt','ref','workflowStatus','validatedAt','emailSentAt','emailRecipient','emailMessageId','sendHistory'].includes(k)) continue;
      const nodes=form.querySelectorAll(`[name="${CSS.escape(k)}"]`);
      if(!nodes.length) continue;
      nodes.forEach(el=>{if(el.type==='radio')el.checked=el.value===v;else if(el.type==='checkbox')el.checked=!!v;else el.value=v??'';});
    }
    if(data.drawing){const img=new Image();img.onload=()=>{const r=canvas.getBoundingClientRect();ctx.clearRect(0,0,r.width,r.height);ctx.drawImage(img,0,0,r.width,r.height);};img.src=data.drawing;}
    currentRef=$('#dossierRef').value || data.ref || generateRef(); $('#dossierRef').value=currentRef;$('#dossierRefTop').textContent=currentRef;
    $('#telephone').value=formatPhone($('#telephone').value); $('#phoneNormalized').textContent=normalizedPhone($('#telephone').value)?`Format international : ${normalizedPhone($('#telephone').value)}`:'';
    workflowState={status:data.workflowStatus||'draft',validatedAt:data.validatedAt||null,emailSentAt:data.emailSentAt||null,emailRecipient:data.emailRecipient||null,emailMessageId:data.emailMessageId||null,sendHistory:Array.isArray(data.sendHistory)?data.sendHistory:[]};
    updateAccessoryState();updateWorkflowUI();
  }

  function setSavedState(saved){$('#saveDot').classList.toggle('saved',saved);$('#saveStatus').textContent=saved?'Enregistré localement':'Modifications en cours…';}
  function updateWorkflowUI(){const el=$('#workflowStatus');if(!el)return;const map={draft:'Brouillon',validated:'Validé',sent:'Envoyé'};el.textContent=map[workflowState.status]||'Brouillon';el.className='workflow-pill '+(workflowState.status||'draft');}
  function markDirty(){if(workflowState.status!=='draft'){workflowState.status='draft';workflowState.validatedAt=null;updateWorkflowUI();}}
  function scheduleSave(){markDirty();setSavedState(false);clearTimeout(saveTimer);saveTimer=setTimeout(saveDraft,500);}
  function saveDraft(){const data=formDataObject();localStorage.setItem(STORAGE.draft,JSON.stringify(data));setSavedState(true);}
  function archiveCurrent(mark={}){
    const data={...formDataObject(),...mark};
    const list=JSON.parse(localStorage.getItem(STORAGE.dossiers)||'[]');
    const idx=list.findIndex(x=>x.ref===data.ref);
    if(idx>=0) list[idx]={...list[idx],...data}; else list.unshift({...data,createdAt:new Date().toISOString()});
    localStorage.setItem(STORAGE.dossiers,JSON.stringify(list.slice(0,150)));
    localStorage.setItem(STORAGE.draft,JSON.stringify(data)); setSavedState(true); return data;
  }

  function resetForm(){
    if(!confirm('Créer un nouveau dossier ? Le dossier actuel restera dans l’historique uniquement s’il a été enregistré.'))return;
    form.reset();workflowState={status:'draft',validatedAt:null,emailSentAt:null,emailRecipient:null,emailMessageId:null,sendHistory:[]};updateWorkflowUI();currentRef=generateRef();$('#dossierRef').value=currentRef;$('#dossierRefTop').textContent=currentRef;$('#date').value=todayISO();ctx.clearRect(0,0,canvas.width,canvas.height);undoStack=[];updateAccessoryState();saveDraft();window.scrollTo({top:0,behavior:'smooth'});
  }

  function getSettings(){return {recipient:'',store:'Narbonne Accessoires — Atelier 14E Sainte-Eulalie',apiUrl:'',apiPin:'',...JSON.parse(localStorage.getItem(STORAGE.settings)||'{}')}}
  function saveSettings(){const s={recipient:$('#defaultRecipient').value.trim(),store:$('#storeName').value.trim(),apiUrl:$('#emailApiUrl').value.trim(),apiPin:$('#emailApiPin').value};localStorage.setItem(STORAGE.settings,JSON.stringify(s));$('#settingsDialog').close();toast('Réglages enregistrés');}
  function openSettings(){const s=getSettings();$('#defaultRecipient').value=s.recipient;$('#storeName').value=s.store;$('#emailApiUrl').value=s.apiUrl;$('#emailApiPin').value=s.apiPin||'';$('#settingsDialog').showModal();}

  function safePdfText(value=''){
    return String(value??'').replace(/[–—]/g,'-').replace(/•/g,'-').replace(/œ/g,'oe').replace(/Œ/g,'OE').replace(/[“”]/g,'"').replace(/[’]/g,"'").replace(/[^\x00-\xFF]/g,'?');
  }
  const CP1252={8364:128,8218:130,402:131,8222:132,8230:133,8224:134,8225:135,710:136,8240:137,352:138,8249:139,338:140,381:142,8216:145,8217:146,8220:147,8221:148,8226:149,8211:150,8212:151,732:152,8482:153,353:154,8250:155,339:156,382:158,376:159};
  function bytesWinAnsi(str){const out=[];for(const ch of String(str)){const cp=ch.codePointAt(0);if(cp<=255)out.push(cp);else if(CP1252[cp]!=null)out.push(CP1252[cp]);else out.push(63)}return new Uint8Array(out)}
  function bytesAscii(str){return new TextEncoder().encode(str)}
  function concatBytes(...parts){let n=0;parts.forEach(p=>n+=p.length);const out=new Uint8Array(n);let o=0;parts.forEach(p=>{out.set(p,o);o+=p.length});return out}
  function pdfEsc(text){return safePdfText(text).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)')}
  class TinyPdf{
    constructor(){this.objects=[null]}
    reserve(){this.objects.push(null);return this.objects.length-1}
    set(id,data){this.objects[id]=data instanceof Uint8Array?data:bytesWinAnsi(data)}
    add(data){const id=this.reserve();this.set(id,data);return id}
    stream(dict,data){const b=data instanceof Uint8Array?data:bytesWinAnsi(data);return concatBytes(bytesAscii(`<< ${dict} /Length ${b.length} >>\nstream\n`),b,bytesAscii('\nendstream'))}
    build(rootId){const header=new Uint8Array([37,80,68,70,45,49,46,52,10,37,226,227,207,211,10]);const chunks=[header];const offsets=[0];let pos=header.length;for(let i=1;i<this.objects.length;i++){offsets[i]=pos;const pre=bytesAscii(`${i} 0 obj\n`),post=bytesAscii('\nendobj\n'),obj=this.objects[i]||bytesAscii('<<>>');chunks.push(pre,obj,post);pos+=pre.length+obj.length+post.length}const xrefPos=pos;let x=`xref\n0 ${this.objects.length}\n0000000000 65535 f \n`;for(let i=1;i<this.objects.length;i++)x+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';const tail=`trailer\n<< /Size ${this.objects.length} /Root ${rootId} 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;chunks.push(bytesAscii(x),bytesAscii(tail));return concatBytes(...chunks)}
  }
  function base64Bytes(dataUrl){const b64=dataUrl.split(',')[1]||'';const bin=atob(b64);const out=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)out[i]=bin.charCodeAt(i);return out}
  function ensureImage(img){return new Promise((resolve,reject)=>{if(img.complete&&img.naturalWidth)return resolve();img.addEventListener('load',resolve,{once:true});img.addEventListener('error',reject,{once:true})})}
  async function imageJpeg(img,bg='#073e5b',w=900,h=260,quality=.9){await ensureImage(img);const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.fillStyle=bg;g.fillRect(0,0,w,h);const r=Math.min(w/img.naturalWidth,h/img.naturalHeight);const dw=img.naturalWidth*r,dh=img.naturalHeight*r;g.drawImage(img,(w-dw)/2,(h-dh)/2,dw,dh);return {bytes:base64Bytes(c.toDataURL('image/jpeg',quality)),width:w,height:h}}
  async function vehicleCompositeJpeg(drawingDataUrl=''){const img=$('#vehicleImage');await ensureImage(img);const w=1500,h=660,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.fillStyle='#ffffff';g.fillRect(0,0,w,h);g.strokeStyle='#e8eef2';g.lineWidth=1;for(let x=0;x<w;x+=40){g.beginPath();g.moveTo(x,0);g.lineTo(x,h);g.stroke()}for(let y=0;y<h;y+=40){g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke()}const pad=28,availW=w-pad*2,availH=h-pad*2,r=Math.min(availW/img.naturalWidth,availH/img.naturalHeight),dw=img.naturalWidth*r,dh=img.naturalHeight*r;g.drawImage(img,(w-dw)/2,(h-dh)/2,dw,dh);if(drawingDataUrl){const ann=new Image();ann.src=drawingDataUrl;await ensureImage(ann);g.drawImage(ann,0,0,w,h)}else g.drawImage(canvas,0,0,w,h);return {bytes:base64Bytes(c.toDataURL('image/jpeg',.88)),width:w,height:h}}
  function color(rgb){return rgb.map(v=>(v/255).toFixed(3)).join(' ')}
  const C={navy:[7,62,91],blue:[8,119,189],yellow:[255,212,0],ink:[22,36,45],muted:[100,117,128],line:[217,229,235],soft:[243,247,249],ok:[32,135,92]};
  function rectCmd(x,top,w,h,fill,stroke=null,line=1){const y=(841.89-top-h).toFixed(2);let s='q ';if(fill)s+=`${color(fill)} rg `;if(stroke)s+=`${color(stroke)} RG ${line} w `;s+=`${x.toFixed(2)} ${y} ${w.toFixed(2)} ${h.toFixed(2)} re ${fill&&stroke?'B':fill?'f':'S'} Q\n`;return s}
  function lineCmd(x1,t1,x2,t2,stroke=C.line,width=1){return `q ${color(stroke)} RG ${width} w ${x1.toFixed(2)} ${(841.89-t1).toFixed(2)} m ${x2.toFixed(2)} ${(841.89-t2).toFixed(2)} l S Q\n`}
  function textCmd(text,x,top,size=9,bold=false,fill=C.ink){return `BT /${bold?'F2':'F1'} ${size} Tf ${color(fill)} rg 1 0 0 1 ${x.toFixed(2)} ${(841.89-top-size).toFixed(2)} Tm (${pdfEsc(text)}) Tj ET\n`}
  function wrapLines(text,maxChars){const words=safePdfText(text).split(/\s+/).filter(Boolean),lines=[];let line='';for(const word of words){const next=line?line+' '+word:word;if(next.length>maxChars&&line){lines.push(line);line=word}else line=next}if(line)lines.push(line);return lines.length?lines:['']}
  function paraCmd(text,x,top,width,size=8.5,lineH=11,fill=C.ink,bold=false,maxLines=99){const maxChars=Math.max(12,Math.floor(width/(size*.53))),lines=wrapLines(text,maxChars).slice(0,maxLines);let s='';lines.forEach((ln,i)=>s+=textCmd(ln,x,top+i*lineH,size,bold,fill));return {cmd:s,height:lines.length*lineH,lines}}
  function labelValue(label,value,x,top,w){let s=textCmd(label.toUpperCase(),x,top,6.8,true,C.muted);s+=textCmd(value||'-',x,top+10,9,true,C.ink);s+=lineCmd(x,top+25,x+w,top+25,C.line,.7);return s}
  function addJpegObject(pdf,img){return pdf.add(pdf.stream(`/Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode`,img.bytes))}
  function imageCmd(id,x,top,w,h){return `q ${w.toFixed(2)} 0 0 ${h.toFixed(2)} ${x.toFixed(2)} ${(841.89-top-h).toFixed(2)} cm /Im${id} Do Q\n`}
  function sectionTitle(title,x,top,w){return rectCmd(x,top,w,24,C.soft,C.line,.7)+rectCmd(x,top,5,24,C.blue)+textCmd(title,x+13,top+7,9.5,true,C.navy)}
  function formatDateFR(v){if(!v)return '';const [y,m,d]=v.split('-');return `${d}/${m}/${y}`}

  async function generatePdfBlob(d=formDataObject()){
    const pdf=new TinyPdf(),catalog=pdf.reserve(),pages=pdf.reserve(),font1=pdf.add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'),font2=pdf.add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
    let logo=null,vehicle=null;try{logo=await imageJpeg($('.brand-logo'))}catch{}try{vehicle=await vehicleCompositeJpeg(d.drawing||'')}catch{}
    const logoId=logo?addJpegObject(pdf,logo):null, vehicleId=vehicle?addJpegObject(pdf,vehicle):null;
    const resParts=[`/Font << /F1 ${font1} 0 R /F2 ${font2} 0 R >>`];if(logoId)resParts.push(`/XObject << /Im${logoId} ${logoId} 0 R${vehicleId?` /Im${vehicleId} ${vehicleId} 0 R`:''} >>`);else if(vehicleId)resParts.push(`/XObject << /Im${vehicleId} ${vehicleId} 0 R >>`);const resources=`<< ${resParts.join(' ')} >>`;
    const page1=pdf.reserve(),page2=pdf.reserve();
    let p1='';p1+=rectCmd(0,0,595.28,70,C.navy);if(logoId)p1+=imageCmd(logoId,24,14,155,44);p1+=textCmd('FICHE DE FAISABILITE TECHNIQUE',205,18,16,true,[255,255,255]);p1+=textCmd('Atelier 14E - Narbonne Accessoires',205,40,9,false,[214,231,239]);p1+=textCmd(d.ref||'',455,18,7.6,true,[255,212,0]);p1+=textCmd(formatDateFR(d.date||''),500,40,8,false,[255,255,255]);
    p1+=sectionTitle('DOSSIER & INTERVENANTS',24,86,547);p1+=labelValue('Client',d.client,34,120,255)+labelValue('Objet / devis',d.objet,306,120,255)+labelValue('Vendeur',d.vendeur,34,158,255)+labelValue('Technicien',d.technicien,306,158,255);
    p1+=sectionTitle('VEHICULE',24,202,547);p1+=labelValue('Marque / modele',[d.marque,d.modele].filter(Boolean).join(' '),34,236,255)+labelValue('Immatriculation',d.immat,306,236,120)+labelValue('Annee',d.annee,440,236,121)+labelValue('Type',d.typeVehicule,34,274,160)+labelValue('Porteur',d.porteur,208,274,180)+labelValue('Kilometrage',d.km?`${d.km} km`:'',402,274,159)+labelValue('VIN / chassis',d.vin,34,312,255)+labelValue('Telephone',d.telephone,306,312,120)+labelValue('E-mail',d.email,440,312,121);
    p1+=sectionTitle('ACCESSOIRES CONCERNES',24,356,547);const acc=d.accessories||[];let y=389;const cols=[34,306];acc.slice(0,14).forEach((a,i)=>{const col=i%2,row=Math.floor(i/2),yy=y+row*25;p1+=rectCmd(cols[col],yy,250,20,[255,255,255],C.line,.6);p1+=textCmd(a.name,cols[col]+8,yy+5,8.2,true,C.ink);p1+=textCmd(a.devis?'DEVIS':'',cols[col]+166,yy+5,6.8,true,C.blue);p1+=textCmd(a.commande?'COMMANDE':'',cols[col]+202,yy+5,6.3,true,C.navy)});if(!acc.length)p1+=textCmd('Aucun accessoire selectionne',34,394,9,false,C.muted);if(acc.length>14)p1+=textCmd(`+ ${acc.length-14} autre(s) accessoire(s)`,34,570,7.5,true,C.muted);
    p1+=sectionTitle('CONCLUSION TECHNIQUE',24,590,547);p1+=labelValue('Avis',d.avis||'Non renseigne',34,624,160)+labelValue('MO complementaire',d.moComp||'A definir',208,624,160)+labelValue('Fournitures',d.fournitures,382,624,179);const c1=paraCmd(d.contraintes||'Aucune contrainte renseignee.',34,674,250,8,10,C.ink,false,7);p1+=textCmd('CONTRAINTES / CONTROLES',34,660,6.8,true,C.muted)+c1.cmd;const c2=paraCmd(d.preconisations||'Aucune preconisation renseignee.',306,674,255,8,10,C.ink,false,7);p1+=textCmd('PRECONISATIONS TECHNICIEN',306,660,6.8,true,C.muted)+c2.cmd;p1+=lineCmd(24,813,571,813,C.line,.8)+textCmd(`Document genere depuis l'application Atelier 14E - ${d.ref||''}`,24,820,6.7,false,C.muted);
    let p2='';p2+=rectCmd(0,0,595.28,58,C.navy);p2+=textCmd('POSITIONNEMENT & VALIDATION',24,18,15,true,[255,255,255]);p2+=textCmd(d.ref||'',430,21,8,true,[255,212,0]);p2+=sectionTitle('POSITIONNEMENT SUR LE VEHICULE',24,76,547);if(vehicleId)p2+=rectCmd(24,110,547,260,[255,255,255],C.line,.8)+imageCmd(vehicleId,34,120,527,240);else p2+=textCmd('Vue vehicule indisponible',34,130,9,false,C.muted);p2+=textCmd('NOTES DE POSITIONNEMENT',34,388,6.8,true,C.muted);p2+=paraCmd(d.positionNotes||'Aucune note.',34,401,527,8.5,11,C.ink,false,7).cmd;
    p2+=sectionTitle('VALIDATION & TRACABILITE',24,492,547);const yn=v=>v?'OUI':'NON';p2+=labelValue('Telephone a jour',yn(d.telUpToDate),34,526,120)+labelValue('Client informe',yn(d.clientInformed),168,526,120)+labelValue('Retour vendeur',yn(d.vendorValidated),302,526,120)+labelValue('Statut',workflowState.status==='sent'?'Envoye':workflowState.status==='validated'?'Valide':'Brouillon',436,526,125);p2+=labelValue('Valide le',workflowState.validatedAt?new Date(workflowState.validatedAt).toLocaleString('fr-FR'):'-',34,564,255)+labelValue('Dernier envoi',workflowState.emailSentAt?new Date(workflowState.emailSentAt).toLocaleString('fr-FR'):'-',306,564,255);p2+=textCmd('NOTE INTERNE FINALE',34,610,6.8,true,C.muted);p2+=paraCmd(d.finalNote||'Aucune note interne.',34,623,527,8.5,11,C.ink,false,8).cmd;if(workflowState.emailRecipient)p2+=textCmd(`Destinataire dernier envoi : ${workflowState.emailRecipient}`,34,720,7.6,true,C.blue);if(workflowState.emailMessageId)p2+=textCmd(`ID transmission : ${workflowState.emailMessageId}`,34,738,7,false,C.muted);p2+=lineCmd(24,813,571,813,C.line,.8)+textCmd('Document interne - Atelier 14E - Narbonne Accessoires',24,820,6.7,false,C.muted);
    const cs1=pdf.add(pdf.stream('',bytesWinAnsi(p1))),cs2=pdf.add(pdf.stream('',bytesWinAnsi(p2)));pdf.set(page1,`<< /Type /Page /Parent ${pages} 0 R /MediaBox [0 0 595.28 841.89] /Resources ${resources} /Contents ${cs1} 0 R >>`);pdf.set(page2,`<< /Type /Page /Parent ${pages} 0 R /MediaBox [0 0 595.28 841.89] /Resources ${resources} /Contents ${cs2} 0 R >>`);pdf.set(pages,`<< /Type /Pages /Kids [${page1} 0 R ${page2} 0 R] /Count 2 >>`);pdf.set(catalog,`<< /Type /Catalog /Pages ${pages} 0 R >>`);return new Blob([pdf.build(catalog)],{type:'application/pdf'});
  }
  function downloadBlob(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1500)}
  async function downloadPdf(){const d=archiveCurrent();const blob=await generatePdfBlob(d);downloadBlob(blob,`${d.ref||'faisabilite-14E'}.pdf`);toast('PDF genere')}
  async function previewPdf(){const holder=window.open('about:blank','_blank');try{const d=archiveCurrent();const blob=await generatePdfBlob(d);const url=URL.createObjectURL(blob);if(holder)holder.location.href=url;else window.open(url,'_blank');setTimeout(()=>URL.revokeObjectURL(url),60000)}catch(e){if(holder)holder.close();throw e}}
  function validateData(d){const missing=[];if(!d.client)missing.push('client');if(!d.vendeur)missing.push('vendeur');if(!d.technicien)missing.push('technicien');if(!d.avis)missing.push('avis technique');if(!([d.immat,d.vin,d.marque,d.modele].some(Boolean)))missing.push('identification vehicule');return missing}
  function buildSendSubject(d){return `Faisabilite technique ${d.ref} - ${[d.client,d.marque,d.modele].filter(Boolean).join(' ')}`.trim()}
  function buildSendMessage(d){return `Bonjour,\n\nVeuillez trouver en piece jointe le rapport de faisabilite technique ${d.ref}.\n\nClient : ${d.client||'-'}\nVehicule : ${[d.marque,d.modele,d.immat].filter(Boolean).join(' - ')||'-'}\nAvis : ${d.avis||'-'}\n\nCordialement,\nAtelier 14E - Narbonne Accessoires`}
  function renderValidationSummary(d){const missing=validateData(d),api=!!getSettings().apiUrl;$('#validationSummary').innerHTML=`<div class="summary-chip ${missing.length?'warn':'ok'}"><small>Completude</small><strong>${missing.length?`A completer : ${escapeHtml(missing.join(', '))}`:'Dossier pret a valider'}</strong></div><div class="summary-chip"><small>Client</small><strong>${escapeHtml(d.client||'-')}</strong></div><div class="summary-chip"><small>Vehicule</small><strong>${escapeHtml([d.marque,d.modele,d.immat].filter(Boolean).join(' - ')||'-')}</strong></div><div class="summary-chip ${api?'ok':'warn'}"><small>Envoi direct</small><strong>${api?'API configuree':'API non configuree - partage manuel'}</strong></div>`;return missing}
  function openValidation(){const d=archiveCurrent();const settings=getSettings();renderValidationSummary(d);$('#sendTo').value=settings.recipient||d.email||'';$('#sendCc').value='';$('#sendSubject').value=buildSendSubject(d);$('#sendMessage').value=buildSendMessage(d);$('#sendStatus').className='send-status';$('#sendStatus').textContent='Le PDF sera genere a partir des donnees actuellement enregistrees.';$('#validationDialog').showModal()}
  function blobToBase64(blob){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(String(r.result).split(',')[1]||'');r.onerror=reject;r.readAsDataURL(blob)})}
  async function fallbackSharePdf(blob,d,to,subject,message){const file=new File([blob],`${d.ref}.pdf`,{type:'application/pdf'});try{if(navigator.canShare?.({files:[file]})&&navigator.share){await navigator.share({title:subject,text:message,files:[file]});return {method:'web-share',id:'partage-systeme'}}}catch(e){if(e?.name==='AbortError')throw e}downloadBlob(blob,`${d.ref}.pdf`);window.location.href=`mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;return {method:'mailto+download',id:'manuel'}}
  async function sendValidatedPdf(){const d=archiveCurrent(),missing=renderValidationSummary(d),to=$('#sendTo').value.trim(),cc=$('#sendCc').value.trim(),subject=$('#sendSubject').value.trim()||buildSendSubject(d),message=$('#sendMessage').value.trim()||buildSendMessage(d),status=$('#sendStatus');if(missing.length){status.className='send-status error';status.textContent=`Validation impossible : renseigner ${missing.join(', ')}.`;return}if(!to||!/^\S+@\S+\.\S+$/.test(to)){status.className='send-status error';status.textContent='Renseigner une adresse e-mail destinataire valide.';return}workflowState.status='validated';workflowState.validatedAt=new Date().toISOString();updateWorkflowUI();archiveCurrent();status.className='send-status loading';status.textContent='Generation du PDF puis transmission...';try{const blob=await generatePdfBlob(formDataObject()),settings=getSettings();let result;if(settings.apiUrl){const pdfBase64=await blobToBase64(blob);const res=await fetch(settings.apiUrl.replace(/\/$/,''),{method:'POST',headers:{'Content-Type':'application/json',...(settings.apiPin?{'X-App-Pin':settings.apiPin}:{})},body:JSON.stringify({to,cc:cc||undefined,subject,message,pdfBase64,filename:`${d.ref}.pdf`,metadata:{ref:d.ref,client:d.client,immat:d.immat,vendeur:d.vendeur,technicien:d.technicien,avis:d.avis}})});const body=await res.json().catch(()=>({}));if(!res.ok)throw new Error(body.error||`Erreur d'envoi (${res.status})`);result={method:'api',id:body.id||body.messageId||'envoye'}}else result=await fallbackSharePdf(blob,d,to,subject,message);const sentAt=new Date().toISOString();workflowState.status='sent';workflowState.emailSentAt=sentAt;workflowState.emailRecipient=to;workflowState.emailMessageId=result.id;workflowState.sendHistory=[...(workflowState.sendHistory||[]),{sentAt,to,cc,method:result.method,id:result.id}].slice(-20);updateWorkflowUI();archiveCurrent();status.className='send-status success';status.textContent=result.method==='api'?`Rapport envoye a ${to}. ID : ${result.id}`:`PDF prepare pour ${to}. L'envoi final se fait via votre application de messagerie.`;toast('Transmission enregistree')}catch(e){if(e?.name==='AbortError'){status.className='send-status';status.textContent='Partage annule.';return}status.className='send-status error';status.textContent=`Echec de transmission : ${e.message||e}`}}

  function renderHistory(){
    const list=JSON.parse(localStorage.getItem(STORAGE.dossiers)||'[]');const root=$('#historyList');if(!list.length){root.innerHTML='<p style="color:#71838e;font-size:12px">Aucun dossier archive sur cet appareil.</p>';return}root.innerHTML=list.map((d,i)=>{const sent=d.emailSentAt?`<span class="history-send">Envoye le ${new Date(d.emailSentAt).toLocaleString('fr-FR')} a ${escapeHtml(d.emailRecipient||'')}</span>`:'';return `<div class="history-item"><div><strong>${escapeHtml(d.ref||'Sans reference')} - ${escapeHtml(d.client||'Client non renseigne')}</strong><p>${escapeHtml([d.marque,d.modele,d.immat].filter(Boolean).join(' - '))}<br>${d.updatedAt?new Date(d.updatedAt).toLocaleString('fr-FR'):''}</p>${sent}</div><div class="history-actions"><button data-open="${i}">Ouvrir</button><button data-export="${i}">PDF</button><button class="delete" data-delete="${i}">Supprimer</button></div></div>`}).join('');root.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>{restoreForm(list[+b.dataset.open]);localStorage.setItem(STORAGE.draft,JSON.stringify(list[+b.dataset.open]));$('#historyDialog').close();window.scrollTo({top:0,behavior:'smooth'})});root.querySelectorAll('[data-export]').forEach(b=>b.onclick=async()=>{const item=list[+b.dataset.export];const old=workflowState;workflowState={status:item.workflowStatus||'draft',validatedAt:item.validatedAt||null,emailSentAt:item.emailSentAt||null,emailRecipient:item.emailRecipient||null,emailMessageId:item.emailMessageId||null,sendHistory:item.sendHistory||[]};try{const blob=await generatePdfBlob(item);downloadBlob(blob,`${item.ref||'faisabilite'}.pdf`)}finally{workflowState=old;updateWorkflowUI()}});root.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>{if(confirm('Supprimer ce dossier de cet appareil ?')){list.splice(+b.dataset.delete,1);localStorage.setItem(STORAGE.dossiers,JSON.stringify(list));renderHistory()}})
  }

  function setupPWA(){
    if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
    window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('#installBtn').hidden=false;});
    $('#installBtn').onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$('#installBtn').hidden=true;};
  }

  function init(){
    populateLists();renderAccessories();setupFormatters();setupDrawing();setupPWA();
    currentRef=generateRef();$('#dossierRef').value=currentRef;$('#dossierRefTop').textContent=currentRef;$('#date').value=todayISO();
    const draft=JSON.parse(localStorage.getItem(STORAGE.draft)||'null');if(draft) setTimeout(()=>restoreForm(draft),50);
    form.addEventListener('input',scheduleSave);form.addEventListener('change',e=>{if(e.target.matches('[data-acc-index]'))updateAccessoryState();scheduleSave();});
    $('#saveBtn').onclick=()=>{archiveCurrent();toast('Dossier archive sur cet appareil')};
    $('#newBtn').onclick=resetForm;$('#pdfBtn').onclick=downloadPdf;$('#validateBtn').onclick=openValidation;
    $('#settingsBtn').onclick=openSettings;$('#saveSettings').onclick=saveSettings;
    $('#historyBtn').onclick=()=>{renderHistory();$('#historyDialog').showModal()};$('#closeHistory').onclick=()=>$('#historyDialog').close();
    $('#closeValidation').onclick=()=>$('#validationDialog').close();$('#previewPdfBtn').onclick=()=>previewPdf().catch(e=>toast('Erreur PDF'));$('#downloadPdfBtn').onclick=()=>downloadPdf().catch(()=>toast('Erreur PDF'));$('#sendPdfBtn').onclick=sendValidatedPdf;
    window.addEventListener('beforeprint',saveDraft);
    updateAccessoryState();updateWorkflowUI();
  }

  init();
})();
