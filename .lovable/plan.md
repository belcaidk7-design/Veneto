

# Audit complet + nouvelles features (sans B2B)

Fusion des deux plans précédents en une seule passe d'implémentation, **excluant la section Pro/B2B**.

## A. Corrections (audit)

### A1. Bug scroll au changement de page
Créer `src/components/ScrollToTop.tsx` qui écoute `useLocation()` et fait `window.scrollTo(0,0)` à chaque changement de pathname. Le monter dans `<BrowserRouter>` avant `<Routes>`.

### A2. Page Matériaux visuelle
Refondre `src/pages/Materials.tsx` :
- Sections alternées image/texte (gauche/droite) pour chaque matériau
- Image hero = première photo produit qui utilise ce matériau (réutilisation des assets existants, aucune génération)
- Mini-galerie de 3-5 vignettes produits cliquables (au lieu des liens texte)
- Cliquer une vignette → `/products?material=<key>` (filtre pré-appliqué)

### A3. Filtre par query param dans Products
`src/pages/Products.tsx` : lire `?material=marble` au montage et initialiser le state `active` avec ce filtre.

### A4. Audit boutons & liens
Lecture de `Header`, `Footer`, `Index`, `Blog`, `BlogPost`, `Contact` pour repérer tout `href="#"`, `onClick` vide, ou CTA non câblé. Correction systématique vers la bonne route ou suppression.

## B. Nouvelles features

### B1. Conversion & contact
- **WhatsApp flottant** : bouton fixe bas-droite, lien `wa.me/<numéro>` (numéro à confirmer — placeholder en attendant).
- **Bouton "Appeler" mobile** dans le header (lien `tel:`).
- **Téléchargement catalogue PDF** : bouton sur la home + footer, lien vers le PDF déjà uploadé (`greenova_light_rasterized.pdf` à servir depuis `/public`).

### B2. SEO & meta
- Composant `<Seo>` réutilisable (title, description, og:image, og:url) basé sur `react-helmet-async`.
- Meta uniques par page (Index, Products, Materials, Blog, BlogPost, About, Contact).
- `public/sitemap.xml` généré statiquement avec toutes les routes.
- `robots.txt` mis à jour pour pointer vers le sitemap.
- Schema.org JSON-LD : `LocalBusiness` sur Home + Contact, `Article` sur BlogPost.

### B3. Pages produit individuelles
Nouvelle route `/products/:slug` (`src/pages/ProductDetail.tsx`) :
- Photo grande (lightbox au clic)
- Nom, catégorie, description longue (i18n)
- Liste des matériaux disponibles avec liens vers `/materials`
- Finitions courantes (poli, flammé, brossé, vieilli) — texte
- CTA "Demander un devis" qui ouvre `QuoteModal` pré-rempli avec le produit
- Section "Produits similaires" (3 autres produits de la même catégorie)
- `ProductCard` devient cliquable → `/products/<id>`

### B4. Lightbox galerie
Composant `<Lightbox>` simple (overlay plein écran + close au clic/escape) utilisé sur `ProductDetail` et optionnellement sur `Materials`.

### B5. Page Réalisations / Projets
Nouvelle route `/projects` (`src/pages/Projects.tsx`) :
- Grille de 6-8 projets fictifs (à remplacer plus tard par tes vraies réalisations)
- Carte par projet : photo, lieu, type (résidentiel/public/commercial), matériaux utilisés
- Données dans `src/data/projects.ts`
- Photos AI générées (style cohérent avec le reste du site, ~6 images)
- Lien ajouté dans header + footer

### B6. Témoignages sur la Home
Section sur `Index.tsx` avec 3 quotes (architecte, particulier, entreprise) — données dans `src/data/testimonials.ts`, traductions i18n.

### B7. FAQ
Nouvelle route `/faq` (`src/pages/Faq.tsx`) :
- Composant `Accordion` (déjà présent dans shadcn)
- 8-10 questions/réponses : entretien, livraison, délais, échantillons, finitions, garanties
- Lien depuis footer

### B8. Page Process / Savoir-faire
Nouvelle route `/savoir-faire` (`src/pages/Craft.tsx`) :
- Storytelling en 4 étapes : extraction → coupe → finition → livraison
- Photo + texte par étape (4 images AI cohérentes)
- Lien depuis About et footer

### B9. Polish UX
- **Cookie consent** banner RGPD (composant simple, persistance localStorage)
- **404 sur-mesure** : `src/pages/NotFound.tsx` enrichi avec photo de pierre + lien retour
- **Skeleton loaders** sur images produits (utilisation de `Skeleton` shadcn déjà présent)
- **Animations fade-in au scroll** : hook `useInView` simple appliqué aux sections clés

### B10. Blog enrichi
- Tags / catégories d'articles (`src/data/blog.ts` enrichi)
- Filtre par tag sur la page Blog
- Section "Articles liés" en bas de chaque BlogPost (3 articles même tag)

## C. i18n

Toutes les nouvelles strings ajoutées dans les 4 locales : `en.ts`, `fr.ts`, `it.ts`, `de.ts`.

## D. Fichiers impactés

**Créés** :
- `src/components/ScrollToTop.tsx`, `src/components/Seo.tsx`, `src/components/WhatsAppButton.tsx`, `src/components/Lightbox.tsx`, `src/components/CookieConsent.tsx`, `src/components/Testimonials.tsx`
- `src/pages/ProductDetail.tsx`, `src/pages/Projects.tsx`, `src/pages/Faq.tsx`, `src/pages/Craft.tsx`
- `src/data/projects.ts`, `src/data/testimonials.ts`
- `src/hooks/useInView.ts`
- `public/sitemap.xml`, `public/catalogue-greenova.pdf` (copie du PDF uploadé)
- 6-10 nouvelles images AI (projets + savoir-faire)

**Modifiés** :
- `src/App.tsx` (routes + ScrollToTop + HelmetProvider)
- `src/pages/Materials.tsx`, `src/pages/Products.tsx`, `src/pages/Index.tsx`, `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx`, `src/pages/NotFound.tsx`, `src/pages/About.tsx`, `src/pages/Contact.tsx`
- `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/ProductCard.tsx`
- `src/data/blog.ts`, `src/data/catalog.ts` (slugs)
- `src/i18n/locales/*.ts` (nouvelles strings)
- `public/robots.txt`
- `index.html` (meta de base + lang)

**Dépendance ajoutée** : `react-helmet-async`.

## E. À me confirmer pendant l'implémentation
- **Numéro WhatsApp & téléphone** : je mets un placeholder `+39 000 000 0000` que tu remplaceras.
- **Projets fictifs** : 6 projets génériques (villa privée, place publique, hôtel, résidence, cuisine, salle de bain). Tu remplaceras par tes vraies réalisations.
- **Témoignages** : 3 quotes plausibles (à remplacer par les vrais).

## F. Hors scope (volontairement reporté)
- Espace Pro/B2B, login, tarifs, fiches techniques PDF, dispo stock, calculateur quantité.
- Demande d'échantillon physique (pourra venir après).
- URLs traduites `/fr/produits` (chantier SEO important, à faire dans une 2e passe dédiée).
- Mode sombre.

