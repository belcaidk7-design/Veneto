

# Refonte contenu + conversion + fluidité (passe complète)

Objectif : donner envie de contacter rapidement. Plus de contenu, moins de tirets, design plus fluide, fiches produits riches.

## A. Réécriture du ton (tirets + style)

### A1. Suppression systématique des tirets cadratins (—)
Audit + remplacement dans `fr.ts`, `en.ts`, `it.ts`, `de.ts` :
- Titres `H1/H2` réécrits sans `—` (ex : `"HQ Stones — Pierre Naturelle, Projets d'Exception"` → `"La pierre naturelle italienne pour vos projets d'exception"`).
- Sublines reformulées en phrases complètes plutôt qu'en énumérations télégraphiques.
- Descriptions matériaux/catégories : phrases liées, plus chaleureuses, plus vendeuses.

### A2. Nouveau ton commercial chaleureux
- Hero : promesse claire + bénéfice client + CTA contextualisé.
- Sections : un mini-storytelling au lieu de listes sèches.
- Tous les CTA reformulés ("Demander un devis" → "Parlons de votre projet", etc. — à valider en relecture).

## B. Fiches produits enrichies (structure + contenu mutualisé)

### B1. Extension du modèle `Product` dans `src/data/catalog.ts`
Ajout (optionnels) :
- `descriptionKey` (description longue 3-4 paragraphes, mutualisée par catégorie/matériau quand pertinent).
- `recommendedFinishes: Finish[]` (sous-ensemble des finitions adaptées).
- `typicalUses: string[]` (clés i18n).
- `formats: string[]` (ex : `'30×60 cm'`, `'sur mesure'`).
- `careTips` clé i18n.

### B2. Refonte de `ProductDetail.tsx`
Nouvelles sections (en plus de l'existant) :
1. **Breadcrumb** (Accueil > Produits > Catégorie > Produit) — SEO + UX.
2. **Hero produit** image gauche + titre/desc/CTA droite (existant), enrichi.
3. **"Pourquoi cette pierre"** : 3 cartes bénéfices (durabilité, esthétique, sur-mesure).
4. **Usages typiques** : liste illustrée d'icônes Lucide.
5. **Matériaux disponibles** (existant) avec mini-paragraphe par matériau.
6. **Finitions recommandées** : grille avec swatches + courte description de chaque finition.
7. **Formats & sur-mesure** : tableau simple.
8. **Conseils d'entretien** : 3-4 puces.
9. **FAQ produit** (3-4 questions ciblées via accordion partagé).
10. **CTA sticky en bas (mobile)** "Demander un devis" toujours visible.
11. **Bloc contact final** avant les related : "Un projet en tête ? Réponse sous 24h" + bouton + WhatsApp.
12. **Related products** (existant, gardé).

### B3. JSON-LD Product schema sur chaque fiche
`@type: Product` avec name, image, description, brand, category — pour le SEO Google Shopping/résultats enrichis.

## C. Pages matériaux enrichies

Sur `Materials.tsx`, allonger chaque bloc matériau :
- `marbleDesc` passe de 1 phrase à 1 paragraphe complet (origine, caractère, usages).
- Ajout sous chaque matériau : `marbleUses` (liste 4-5 usages typiques) + `marbleCare` (entretien court) + `marbleFinishes` (finitions recommandées sous forme de chips).
- CTA contextuel "Demander un échantillon de marbre" par bloc.

JSON-LD `@type: Article` ou `WebPage` enrichi par section.

## D. Accueil refondu (fluidité + storytelling)

### D1. Hero
- Titre réécrit sans tirets.
- Ajout d'une **ligne de réassurance** sous les CTA : "Carrières partenaires en Italie · Livraison Europe · Devis sous 24h".
- Légère animation parallax sur l'image au scroll (CSS only).

### D2. Nouvelle section "Pourquoi HQ Stones" (4 piliers)
Après les catégories, avant les matériaux : 4 colonnes avec icônes Lucide (Origine directe, Sur-mesure, Conseil expert, Logistique maîtrisée). Chaque colonne 2-3 lignes.

### D3. Section "Notre processus en 4 étapes" (mini)
Teaser de la page Craft, en 4 cartes horizontales numérotées avec lien "Voir notre savoir-faire".

### D4. Section "Réalisations récentes" (mini gallery)
3 projets en cartes plein-largeur avec hover zoom, lien vers `/projects`. Actuellement la page Projects existe mais n'est pas teasée sur l'accueil.

### D5. Section CTA finale forte
Avant le footer : bandeau accent or doux + "Parlons de votre projet" + bouton blanc + numéro de téléphone visible.

### D6. Animations au scroll
Utiliser le hook `useInView` existant pour fade-in-up subtil sur les sections au scroll. Durée 600-800ms, easing doux. Pas d'effet tape-à-l'œil.

## E. Micro-design / fluidité

- Transitions de page douces (fade) via wrapper dans `Layout.tsx`.
- Survols enrichis : sur les cards, ajouter un revealing du CTA (bouton "Voir →" qui apparait en bas de l'image au hover desktop).
- Ratios d'image harmonisés (4:5 pour produits dans les listes ? à confirmer — actuellement 4:3, je laisse).
- Plus de respirations verticales sur mobile (espace entre sections augmenté).
- Boutons CTA principaux : ajouter une légère élévation au hover (shadow).

## F. SEO renforcé

- Toutes les meta titles et descriptions réécrites (≤60 / ≤155 chars), mots-clés réels (« marbre Calacatta Italie », « pavé porphyre extérieur », etc.).
- H1 unique par page (audit + correction).
- Alt text descriptif sur toutes les images produits (« Sol intérieur en marbre Calacatta poli » au lieu de « Sol intérieur »).
- Sitemap.xml mis à jour avec les nouvelles fiches produit `/products/:slug`.
- JSON-LD `BreadcrumbList` sur les fiches produit.
- Lien interne croisé : depuis chaque fiche produit, lien vers la page matériau correspondante et l'article de blog associé si dispo.

## G. Internationalisation

Tout le nouveau contenu ajouté dans les 4 langues (`fr`, `en`, `it`, `de`). FR et EN soignés, IT et DE traduits proprement (pas de Google Translate visible).

## H. Hors scope (pour plus tard)
- Calculateur de quantité, demande d'échantillon physique avec adresse, espace pro/B2B, comparateur de pierres, configurateur 3D, mode sombre, vidéos sur les fiches produits.

## Notes
- Le contenu mutualisé (descriptions par catégorie, conseils d'entretien par matériau) sera explicitement marqué dans le code avec un commentaire `// CONTENT: review and refine` pour que tu puisses repasser dessus facilement.
- Pas de modification du backend ni de la structure de routes, uniquement contenu + UI.

