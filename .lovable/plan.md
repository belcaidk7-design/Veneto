# Maillage interne pour accélérer l'indexation

## Contexte

Google Search Console indique que `/products`, `/materials` et `/legal` sont **découvertes mais pas encore indexées**, et `/contact` reste **inconnue de Google**. Les liens existent déjà dans le Header et le Footer, mais Google privilégie les pages avec des liens **contextuels** dans le contenu principal (pas juste la navigation répétée sur chaque page).

Objectif : ajouter des liens éditoriaux dans le corps des pages clés (Home, About, Projects, Blog, BlogPost, Craft) pour donner à Google plus de signaux de crawl.

## Modifications

### 1. Home (`src/pages/Index.tsx`)
- Section "About teaser" : remplacer le bouton unique vers `/contact` par **deux boutons** : *"Découvrir nos matériaux"* → `/materials` + *"Nous contacter"* → `/contact`.
- Section "Categories" : ajouter en dessous un lien texte *"Voir tout le catalogue"* → `/products`.

### 2. About (`src/pages/About.tsx`)
- Ajouter en fin de page un paragraphe de conclusion avec 3 liens contextuels : vers `/products`, `/materials`, `/contact`.

### 3. Projects (`src/pages/Projects.tsx`)
- Ajouter un bloc "CTA" en bas : *"Inspirez-vous de nos réalisations pour votre projet"* avec liens vers `/products` et `/contact`.

### 4. Craft (`src/pages/Craft.tsx`)
- Ajouter un bloc "Next steps" à la fin : liens vers `/materials` (pour approfondir) et `/contact` (pour un devis).

### 5. Blog + BlogPost (`src/pages/Blog.tsx`, `src/pages/BlogPost.tsx`)
- En bas de `BlogPost` : ajouter un encart *"Voir nos produits liés"* → `/products` + *"Explorer les matériaux"* → `/materials`.
- En bas de `Blog` : petit CTA vers `/products` et `/contact`.

### 6. Footer (`src/components/Footer.tsx`)
- Le lien `/legal` est déjà présent en bas. Aucun changement.
- Ajouter le lien `/legal` **aussi** en dessous du bloc de navigation principal (colonne "Navigation") pour renforcer son signal.

### 7. Traductions
- Ajouter les nouvelles clés (CTAs) dans `src/i18n/locales/fr.ts`, `en.ts`, `it.ts`, `de.ts`.

## Détails techniques

- Utiliser `<Link to="...">` de `react-router-dom` (déjà utilisé partout) — rendu en `<a href>` dans le HTML statique, donc crawlable par Google.
- Aucun changement sur le sitemap (déjà à jour) ni sur `robots.txt`.
- Aucun impact sur le design system existant : réutiliser `Button`, `Reveal`, tokens de couleur (`text-accent`, `bg-foreground`).
- Après déploiement : dans quelques jours, tu pourras demander une réindexation manuelle dans GSC ou relancer une inspection URL.

## Ce qui n'est PAS fait
- Pas de refonte de navigation.
- Pas de breadcrumbs schema.org (déjà présents sur `/blog`).
- Pas de nouvelles pages.
