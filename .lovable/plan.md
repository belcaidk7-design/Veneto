
# Update product catalog with PDF images & remove "Veneto" references

## Goals
1. Extract product photos from your uploaded PDF (`greenova_light_rasterized.pdf`) and use them on each product card.
2. Remove every reference to "Veneto / Vénétie / Veneto, Italia" across the site — keep "Italy" only where it makes sense, since Veneto is just where you're based, not where the stone comes from.

## Step 1 — Extract images from the PDF
Once in build mode, I will:
- Copy the PDF to `/tmp/`
- Use `pdfimages` (poppler) to extract every embedded image into `/tmp/pdf-out/`
- Inspect the extracted images visually to identify which photo corresponds to which product (paving, fountains, columns, sinks, slabs, etc.)
- Optimize them (resize to ~1600px max width, convert to JPG/WebP) and copy the matched ones into `src/assets/products/` with semantic names (e.g. `external-paving.jpg`, `fountains.jpg`, `kitchen-countertops.jpg`…)

If a product in the catalog has no matching photo in the PDF, I'll keep the existing stone-texture placeholder for that one and tell you which products still need imagery.

## Step 2 — Wire images into the catalog
Update `src/data/catalog.ts`:
- Add an `image` field to each `Product`
- Import the new product images and assign them per product

Update `src/components/ProductCard.tsx`:
- Use `product.image` instead of the single shared placeholder (fallback to placeholder if missing)

## Step 3 — Remove "Veneto" everywhere
Surgical edits across:

| File | Change |
|---|---|
| `index.html` | Title & meta description: drop "Veneto, Italy" → keep "Italy" only |
| `src/pages/Index.tsx` | Hero eyebrow `Veneto · Italia` → `Italia` (or remove entirely) |
| `src/pages/Contact.tsx` | Google Maps `q=Veneto%20Italy` → use a generic Italy location or your actual address (placeholder: `Italy`) |
| `src/i18n/locales/en.ts` | `hero.subline`, `home.aboutTitle` ("Crafted in Veneto" → "Crafted in Italy"), `about.subtitle`, `about.storyBody` (rewrite the "Veneto roots" line as "Italian roots"), `contact.infoLocation` ("Veneto, Italy" → "Italy"), `footer.tagline` |
| `src/i18n/locales/it.ts` | Same fields, Italian equivalents (Veneto → Italia) |
| `src/i18n/locales/fr.ts` | Same fields (Vénétie → Italie) |
| `src/i18n/locales/de.ts` | Same fields (Venetien → Italien) |

### Blog post "Veneto Quarries: A Heritage of Stone"
Two options — I'll go with **B** unless you say otherwise:
- **A.** Delete the post entirely (and the `blog-quarry.jpg` asset).
- **B.** Rewrite it as "**Italian Quarries: A Heritage of Stone**" — same structure, broadened to Italian stone heritage in general (no Veneto-specific claims). Keep the cover image. Update slug to `italian-quarries-heritage` and i18n key to `italianQuarries` in all 4 locales.

## Step 4 — QA
- Verify all 17 products render with an image (real photo or placeholder)
- Grep the repo for `Veneto|Vénétie|Venetien|Veneta|veneto` → should return zero matches
- Check the site loads cleanly in EN / IT / FR / DE

## Notes for you
- I can't preview the PDF contents in plan mode (the parser failed on this rasterized file). Once approved, I'll extract and inspect the images, then map them to products as best they fit. If your PDF photos don't cover some products, I'll list them so you can send extra photos.
- The Formspree placeholder endpoint stays untouched.
