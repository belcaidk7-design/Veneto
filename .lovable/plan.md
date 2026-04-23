

# Harmoniser la qualité visuelle des 17 images produits

## Constat
Le site mélange aujourd'hui deux mondes incompatibles :
- **bathtubs.jpg** : photo AI lookbook 1024×1024, lumière douce, fond minéral minimaliste → ton "luxe éditorial" du site.
- **Les 16 autres** : scans de catalogue technique extraits du PDF, basse résolution (455–1199 px, tailles toutes différentes), avec bordures arrondies noires visibles, fonds parasites (briques rouges, atelier en chantier, vitrines de magasin, ciel surexposé, palettes en bois), couleurs ternes.

Résultat : la grille produits paraît hétérogène et amateur.

## Objectif
**Toutes les 17 images en 1024×1024, même direction artistique que `bathtubs.jpg`** : photoréalistes, lumière naturelle douce, fond neutre/minéral, sujet centré, palette cohérente avec le site (off-white, beige pierre, charcoal).

## Approche en 2 modes selon l'image source

### Mode A — Régénération AI complète (produits où la photo source est inutilisable ou bruitée)
Pour ces produits, je génère de zéro avec **Nano Banana 2** (`google/gemini-3.1-flash-image-preview`) :

| Produit | Pourquoi régénérer |
|---|---|
| bollards | Image basse résolution, sujet écrasé |
| sinks | Fond parasite, photo catalogue ancienne |
| benches | Mur de briques rouges agressif en fond |
| sculptures | Statue + atelier de tailleur en arrière-plan (sacs, mur en parpaing) |
| flower-boxes | Devanture de magasin avec affiche/personnage flou en reflet |
| columns | Cadre intérieur banal (escalier domestique, mur rouge) |
| balustrades | Idem — décor intérieur générique |
| curbs | Photo de pavé de ville, peu lisible |
| block-slabs | Palette industrielle, peu valorisant |
| open-book-slabs | Image trop petite (559×541), pixelisée |
| kitchen-countertops | Cuisine datée, faible qualité |

Prompt type : *"Editorial product photography of [produit] in natural [matériau], soft diffused daylight, minimalist neutral stone-textured background, shallow depth of field, luxury catalog aesthetic, off-white and warm beige palette, centered composition, photorealistic, square format"*.

### Mode B — Édition AI à partir de la source (produits où la photo source est exploitable)
Pour ces produits, j'utilise **Nano Banana 2 en mode edit-image** pour garder le sujet réel mais nettoyer/réharmoniser :

| Produit | Action sur l'image source |
|---|---|
| external-paving | Garder la terrasse pavée, retirer la chaise/parasol, harmoniser lumière |
| fountains | Garder la fontaine, nettoyer fond et bords noirs |
| external-cladding | Garder le bardage, neutraliser le fond |
| interior-flooring | Garder le sol, recadrer/épurer |
| interior-cladding | Garder le mur en pierre, nettoyer |

Prompt type : *"Keep the same subject and material. Remove any black border, photo edges from neighboring images, distracting background elements. Replace background with soft neutral stone wall, natural diffused light, luxury editorial style. Output 1024×1024."*

### Conservée telle quelle
- **bathtubs.jpg** (déjà au standard cible — c'est la référence)

## Pipeline technique
1. Pour chaque produit : appel au gateway AI (`/tmp/lovable_ai.py --image` pour générer, `--edit-image` pour éditer la source).
2. Sortie 1024×1024 PNG → conversion JPG qualité 88 → `src/assets/products/<id>.jpg` (écrase l'existant).
3. **QA visuel obligatoire** : ouverture de chaque image finale, vérification qu'aucune n'a de bord noir, fond parasite, ou style discordant. Si une image rate, je relance avec un prompt ajusté (max 2 tentatives par image).
4. Aucun changement à `catalog.ts` ni à `ProductCard.tsx` — les chemins restent identiques.

## Ce que vous obtenez
- Catalogue 100% homogène : 17 images en 1024×1024, même DA que la baignoire actuelle.
- Style luxe éditorial cohérent du Home jusqu'au dernier produit.
- Si une image AI ne vous plaît pas après livraison, on l'ajuste à l'unité.

## Notes
- Coût AI : ~17 appels image (Nano Banana 2). Rapide et abordable.
- Les sources PDF restent dans `/tmp` — récupérables si vous voulez revenir en arrière sur un produit précis.
- Si vous préférez **garder les vraies photos PDF** pour certains produits (ex : `external-paving` parce que c'est une vraie réalisation), dites-le-moi avant que je lance et je laisserai ces images intactes (juste recadrées proprement en 1024 carré).

