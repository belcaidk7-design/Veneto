## Objectif

Supprimer l'accès au catalogue (page et téléchargement) et réutiliser les photos des planches catalogue pour enrichir les fiches produits correspondantes.

## Changements

### 1. Galerie produits enrichie avec les planches catalogue
Dans `src/data/catalog.ts`, ajouter un champ optionnel `gallery: string[]` à `Product`. Mapper les planches de `catalogPlates.ts` par famille vers les produits correspondants :

```text
fountains       → product 'fountains'        (p7, p10, p14, p18)
wallFountains   → product 'wall-fountains'   (p19, p20)
flowerpots      → product 'flower-boxes'     (p21, p23)
pots            → product 'vases'            (p25, p27)
pools           → product 'pools'            (p28, p30)
balustrades     → product 'balustrades'      (p31, p34)
columns         → product 'columns'          (p38, p40)
stairs          → product 'stairs'           (p41, p43)
windowSills     → product 'window-sills'     (p44)
paving          → product 'external-paving'  (p45, p47, p49)
```

Dans `src/pages/ProductDetail.tsx`, afficher cette galerie (sous l'image principale) et brancher le `Lightbox` existant pour le zoom plein écran.

### 2. Suppression de la page Catalogue
- `src/App.tsx` : retirer la route `/catalog` et l'import.
- `src/components/Header.tsx` : retirer l'entrée nav `/catalog`.
- Supprimer `src/pages/Catalog.tsx`.
- `src/i18n/locales/{fr,en,it,de}.ts` : retirer `nav.catalog`, `seo.catalog`, le bloc `catalog: { … }` et la mention dans `home.categoriesTitle` si nécessaire.
- `scripts/generate-sitemap.mjs` + `public/sitemap.xml` : retirer `/catalog`.
- Tests SEO : retirer les assertions sur `/catalog` si présentes.

### 3. Retrait du téléchargement du catalogue PDF
- `src/pages/Index.tsx` : supprimer le bouton `Télécharger le catalogue` (et l'import `Download` devenu inutile).
- `src/components/Footer.tsx` : retirer le lien `/catalogue.pdf`.
- `src/i18n/locales/*` : retirer les clés `hero.downloadCta` et `footer.downloadCatalog`.
- Garder `public/catalogue.pdf` en place (pas de suppression de fichier nécessaire), mais plus aucune référence dans l'UI.

### 4. Conserver les assets
Les 22 fichiers `src/assets/catalog/p*.jpg.asset.json` restent — ils sont désormais utilisés via la galerie produit.

## Vérification
- Naviguer sur `/products/fountains`, `/products/balustrades`, `/products/external-paving` : la galerie additionnelle s'affiche et le lightbox s'ouvre.
- La home n'a plus que le CTA principal "Découvrir le catalogue" → `/products`.
- Aucun lien restant vers `/catalog` ni vers `/catalogue.pdf`.
