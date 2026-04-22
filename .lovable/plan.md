
# Améliorer les images produits & combler les 5 trous

## Problèmes constatés sur les images actuelles
En inspectant chaque image, plusieurs ont des défauts visibles :
- **external-paving** : on voit la base d'une autre photo (toit/maison) en bas
- **columns** : c'est principalement une maison, les colonnes sont écrasées en bas
- **balustrades** : bord noir + tranche d'image voisine à droite
- **fountains** : bord noir à gauche
- **flower-boxes** : c'est une vasque/fontaine en pierre, pas une jardinière
- **bollards** : l'image est correcte mais cadrée trop large (cimetière)
- **sculptures** : tranches d'autres photos visibles à gauche et droite
- **external-cladding** : tranche d'image voisine à droite
- **kitchen-countertops** : tranche d'image voisine à gauche
- **sinks** : tranches d'images voisines à gauche

## Plan en 3 étapes

### Étape 1 — Re-cadrer proprement les 12 images existantes
Le PDF est déjà extrait (`/tmp/pdf-out/` 159 images brutes + `/tmp/pages/` 159 pages rendues). Je vais :
1. Parcourir les pages rendues pour identifier la **bonne photo source** de chaque produit (en évitant les recadrages bricolés sur les pages multi-photos).
2. Pour chaque produit, choisir l'image brute la plus nette/centrée dans `/tmp/pdf-out/img-XXX.jpg` (qui sont les photos individuelles déjà séparées).
3. Recadrer carré/4:3 avec marge propre, retirer tout bord noir ou tranche voisine, et redimensionner à 1200px.
4. Réécraser `src/assets/products/*.jpg` avec les versions corrigées.

Si une image actuelle (ex : `flower-boxes.jpg`) ne représente pas le bon produit, je la remplace par une vraie photo de jardinière trouvée dans le PDF.

### Étape 2 — Combler les 5 produits manquants
Produits qui utilisent encore le placeholder générique :
- **benches** (bancs en pierre)
- **curbs** (bordures / cordoli)
- **bathtubs** (baignoires)
- **open-book-slabs** (dalles open book)
- **block-slabs** (dalles brutes)

Je chercherai dans les 159 images extraites du PDF les photos correspondantes :
- bancs en pierre → généralement aux pages "Panchine" / aménagement extérieur
- bordures → pages "Cordoli"
- baignoires → pages salle de bain / Vasche
- dalles → pages "Lastre" (open book et blocs)

Pour chaque produit où je trouve une photo claire, je l'enregistre sous `src/assets/products/<id>.jpg` et je l'ajoute au catalogue.

**Pour les produits introuvables dans le PDF**, plutôt que de garder le placeholder en pierre, je génère une image AI photo-réaliste haute qualité (Nano Banana 2 / Gemini 3.1 Flash Image) cohérente avec le style sobre du site, par exemple :
- une photo de baignoire en marbre massif si pas dans le PDF
- une dalle open book de marbre symétrique sur fond neutre

### Étape 3 — Câblage & QA
- Mettre à jour `src/data/catalog.ts` pour pointer chaque produit vers sa nouvelle image (les 5 trous comblés).
- Le `placeholder-stone.jpg` reste comme fallback.
- QA visuel : ouvrir chaque image finale, vérifier qu'aucune n'a de bord noir, de tranche voisine, ou de mauvais cadrage. Vérifier que les 17 produits ont bien une vraie image.

## Ce que vous obtiendrez
- Les 12 images existantes nettoyées (pas de bord noir, cadrage centré sur le produit, bonne représentativité).
- Les 5 produits manquants illustrés (PDF en priorité, AI en complément si nécessaire).
- Catalogue 100% illustré, prêt pour la prod.

## Notes
- Si une photo AI ne vous plaît pas, dites-le-moi et je relance avec un prompt ajusté.
- Si vous avez de meilleures photos pour certains produits (ex : baignoires), envoyez-les et je les utiliserai à la place.
