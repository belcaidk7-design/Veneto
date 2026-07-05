## Plan minimal pour publication

Infos reçues :
- **Téléphone / WhatsApp** : +39 329 443 2741
- **Email** : info@hq-stones.com
- **Société** : ARKYBIOX EOOD — VAT BG207398758 — Ulitsa Georgi Dimitrov 1, 3129 Darmantsi, Bulgarie

---

### 1. Remplacer les placeholders téléphone partout

Dans `src/components/Header.tsx`, `src/components/WhatsAppButton.tsx`, `src/pages/Contact.tsx`, `src/pages/Index.tsx` :
- `+390000000000` → `+393294432741` (format `tel:`)
- Affichage : `+39 329 443 2741`
- WhatsApp : `393294432741`

### 2. Corriger `public/robots.txt`

Remplacer `hqstones.example` → `hq-stones.com` (lignes `Host:` et `Sitemap:`).

### 3. Connecter le formulaire de contact

Créer une edge function `send-contact-email` qui :
- envoie le lead à `info@hq-stones.com`
- envoie un accusé de réception court au visiteur

Via **Lovable Emails** (zéro clé externe). Nécessite la mise en place du domaine d'envoi `notify.hq-stones.com` — l'utilisateur valide via le dialogue qui s'ouvrira.

`ContactForm.tsx` modifié pour appeler `supabase.functions.invoke('send-contact-email', ...)` au lieu de Formspree.

### 4. Page Mentions légales (minimum légal UE)

Créer `/legal` (route unique, sobre, accessible depuis le footer) contenant :

```
Éditeur du site : ARKYBIOX EOOD
Siège : Ulitsa Georgi Dimitrov 1, 3129 Darmantsi, Bulgarie
TVA intracommunautaire : BG207398758
Contact : info@hq-stones.com — +39 329 443 2741
Hébergeur : Lovable / Supabase (UE)
Données : voir politique de confidentialité ci-dessous
```

+ bloc RGPD court (3 paragraphes) : données collectées via formulaire, finalité (réponse à demande de devis), conservation, droit d'accès/suppression → email à `info@hq-stones.com`.

Traduit FR/EN/IT/DE (clés `legal.*` dans `i18n/locales/*`).

Lien ajouté dans `Footer.tsx`.

### 5. Favicon

Générer un favicon sobre "HQ" sur fond noir avec accent or (cohérent avec la marque), 512×512 → `public/favicon.ico` + référence dans `index.html`.

### 6. OG image

Générer 1200×630 typographique "HQ Stones — Natural Stone, Exceptional Projects" → `public/og-image.jpg` + `<meta property="og:image">` dans `index.html`.

### 7. Reformuler la FAQ Contact

Clé `faq.contact.visit.*` → reformulée en "Comment évaluer les produits à distance ?" (échantillons, visio, photos HD) — cohérent online-only.

---

### Ce qui n'est PAS fait (volontairement, pour rester minimal)

- Pas de page CGV séparée (mention courte dans `/legal` suffit pour un site vitrine sans paiement en ligne)
- Pas de schema.org LocalBusiness (pas de présence physique commerciale en Italie)
- Pas de bannière cookies retravaillée (la `CookieConsent` actuelle suffit, aucun tracker tiers)
- Pas de photos projets refaites (en attente de tes vraies photos)

---

**On lance ?** Je commencerai par les étapes 1, 2, 4, 5, 6, 7 (édits directs), puis 3 (qui demandera ta validation pour la config du domaine email).