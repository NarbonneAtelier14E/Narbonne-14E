# Faisabilité Atelier 14E - Narbonne Accessoires - V2

Cette version transforme la fiche de faisabilité en **application web installable (PWA)** avec :

- saisie client / véhicule / vendeur / technicien ;
- dessin directement sur la vue latérale du véhicule ;
- sauvegarde locale et historique ;
- statut du dossier : Brouillon / Validé / Envoyé ;
- **génération automatique d'un PDF 2 pages** dans le navigateur ;
- écran de validation finale ;
- choix libre du destinataire et d'une copie CC ;
- **envoi du PDF en pièce jointe** via un service sécurisé ;
- mémorisation locale de la date d'envoi, du destinataire et de l'identifiant de transmission.

## Architecture retenue

### 1. GitHub Pages = l'application
GitHub Pages publie `index.html`, `styles.css`, `app.js`, le manifeste PWA et les images. L'application peut ensuite être ajoutée à l'écran d'accueil d'une tablette/PC compatible.

GitHub Pages étant un hébergement statique, la clé permettant d'envoyer des e-mails ne doit jamais être placée dans le JavaScript public.

### 2. Le navigateur = génération du PDF
Le PDF est créé localement par l'application à partir du dossier en cours. Aucune bibliothèque externe n'est nécessaire : le générateur PDF est inclus dans `app.js`.

### 3. Cloudflare Worker = envoi sécurisé
Le dossier `backend-cloudflare-worker/` contient un petit endpoint qui reçoit le PDF généré et l'envoie via l'API Resend. La clé Resend est stockée comme **secret Cloudflare** et n'est jamais exposée dans GitHub Pages.

Un code interne optionnel (`APP_PIN`) peut également être exigé par le Worker.

---

# A. Publication de l'application sur GitHub Pages

1. Créer un dépôt GitHub, par exemple : `faisabilite-atelier-14e`.
2. Copier **tout le contenu de ce dossier** à la racine du dépôt.
3. Envoyer les fichiers sur la branche `main`.
4. Dans GitHub : **Settings > Pages**.
5. Dans **Build and deployment > Source**, choisir **GitHub Actions**.
6. Le workflow `.github/workflows/pages.yml` publie automatiquement l'application.
7. L'adresse sera du type :
   `https://VOTRE-COMPTE.github.io/faisabilite-atelier-14e/`

Chaque modification envoyée sur `main` redéploie automatiquement l'application.

---

# B. Déploiement du service d'envoi e-mail

## Prérequis
- un compte Cloudflare ;
- un compte Resend ;
- idéalement un domaine / sous-domaine autorisé à envoyer les e-mails de l'atelier ;
- une clé API Resend.

## Méthode avec Wrangler

Dans le dossier `backend-cloudflare-worker` :

```bash
npm install
npx wrangler login
```

Modifier `wrangler.jsonc` :

- `ALLOWED_ORIGINS` : l'origine GitHub Pages, par exemple `https://VOTRE-COMPTE.github.io` ;
- `FROM_EMAIL` : adresse expéditrice validée dans Resend ;
- `ARCHIVE_EMAIL` : optionnel, adresse qui recevra automatiquement une copie cachée pour la traçabilité ;
- `REPLY_TO` : optionnel.

Ajouter ensuite les secrets :

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put APP_PIN
```

`APP_PIN` est facultatif mais recommandé pour éviter qu'un tiers utilise publiquement l'endpoint d'envoi.

Déployer :

```bash
npm run deploy
```

Cloudflare fournit une URL du type :

`https://na14e-faisabilite-mail.VOTRE-COMPTE.workers.dev`

---

# C. Relier l'application au Worker

1. Ouvrir l'application GitHub Pages.
2. Cliquer sur la roue dentée **Réglages**.
3. Dans **URL API d'envoi**, coller l'URL du Worker.
4. Renseigner le même **Code d'envoi interne** que le secret `APP_PIN` si celui-ci a été activé.
5. Enregistrer.

Le réglage reste mémorisé sur l'appareil.

---

# D. Fonctionnement final

1. Le technicien remplit le dossier.
2. Il clique sur **Valider & transmettre**.
3. L'application contrôle les informations essentielles.
4. Le destinataire peut être changé librement.
5. **Aperçu PDF** ouvre le rapport généré.
6. **Télécharger PDF** garde une copie locale.
7. **Valider & envoyer** :
   - génère le PDF ;
   - l'envoie au Worker ;
   - le Worker transmet l'e-mail avec le PDF joint ;
   - le fournisseur renvoie un identifiant de message ;
   - l'application enregistre localement la date, le destinataire et cet identifiant.

Si le Worker n'est pas encore configuré, l'application conserve un mode de secours : téléchargement du PDF + ouverture du logiciel de messagerie / feuille de partage selon l'appareil.

---

# Traçabilité

La V2 conserve actuellement les dossiers et les traces d'envoi **sur l'appareil utilisé**.

Pour une traçabilité commune entre toutes les tablettes / PC de l'atelier, l'évolution suivante consisterait à ajouter une base centrale (par exemple Cloudflare D1, Supabase ou une API interne Narbonne Accessoires) avec authentification des utilisateurs.

Le Worker peut aussi envoyer automatiquement une copie cachée vers une adresse d'archivage définie dans `ARCHIVE_EMAIL`.

---

# Sécurité importante

- Ne jamais placer `RESEND_API_KEY` dans `app.js`, GitHub Pages ou `wrangler.jsonc`.
- La clé doit être enregistrée comme **Secret** dans Cloudflare.
- Le code `APP_PIN`, s'il est utilisé, doit lui aussi être enregistré comme Secret.
- En environnement Narbonne Accessoires, il est préférable d'utiliser un domaine et un service d'envoi validés par le service informatique / DPO de l'entreprise.
