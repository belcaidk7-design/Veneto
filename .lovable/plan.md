
# HQ Stones — Multilingual Stone Catalog Website

A refined, luxury-feel catalog site for HQ Stones (Veneto, Italy) showcasing natural stone products across Exterior, Interior, and Raw Slabs categories. No e-commerce — visitors browse and request quotes via a contact form.

## Design system
- **Palette**: off-white `#F8F5F0`, warm stone beige `#C9B99A`, dark charcoal `#1C1C1C`, gold accent `#B8972E`
- **Typography**: Playfair Display (headings) · Inter (body)
- **Feel**: Editorial, generous whitespace, large imagery, subtle hover lifts on cards, gold underline accents on links
- **Fully responsive**, mobile-first

## Pages & sections

### 1. Header (sticky, all pages)
- "HQ Stones" wordmark logo (Playfair, gold accent)
- Nav: Home · Products · Materials · Blog · About · Contact
- Language switcher: EN / IT / FR / DE (dropdown with flags)
- Mobile: hamburger drawer

### 2. Home
- **Hero**: AI-generated full-bleed marble texture, headline *"HQ Stones — Natural Stone, Exceptional Projects"*, subline *"Marble, Granite, Limestone & more — Veneto, Italy"*, gold CTA → catalog
- **Featured categories** (3 large cards: Exterior · Interior · Raw Slabs) with AI hero imagery
- **Materials strip** (Marble · Limestone · Granite · Porfido · Sandstone)
- **About teaser** + CTA to contact

### 3. Products page
- Three category sections (Exterior, Interior, Raw Slabs) with all listed products
- **Material filter bar** (cross-category): Marble · Limestone · Granite · Porfido · Sandstone (multi-select chips)
- **Product cards**: stone-textured placeholder image, translated name, material badge, "Request a quote" button → opens contact modal pre-filled with product

### 4. Materials page
- One section per material with description, typical uses, and product examples

### 5. Blog
- **Index**: card grid (cover, title, category tag, date, "Read more")
- **Categories**: Stone Guide · Projects · Materials · Maintenance Tips · News
- **3 sample posts** in English (e.g. "Choosing the Right Marble for Your Kitchen", "Veneto Quarries: A Heritage of Stone", "Caring for Outdoor Limestone")
- **Article page**: hero image, title, content, author, date, related articles

### 6. Contact
- Form: Full Name · Email · Phone · Product interest (dropdown of all categories) · Message · Submit
- Wired to Formspree with a clearly-marked placeholder endpoint (one-line swap later)
- Zod validation, success/error toasts
- Company info block (HQ Stones, Veneto, Italy) + Google Maps embed placeholder

### 7. About
- Company story, three values (Quality · Expertise · Custom Projects) with icons, team photo placeholder

### 8. Footer
- Logo, nav links, language switcher, social icon placeholders, © HQ Stones 2025

## Internationalization
- **react-i18next** with EN (default), IT, FR, DE
- Full UI translations: navigation, buttons, form labels/validation, footer, blog UI chrome
- **Product names translated** in all 4 languages (full catalog dictionary)
- Category and material names translated
- Language preference persisted in localStorage

## Imagery
- **AI-generated** for: Home hero, 3 category heroes, About, 3 blog covers
- **Stone-texture placeholder tiles** for product cards (easy to swap with real photos later)

## Tech
- React + Tailwind, design tokens in `index.css` + `tailwind.config.ts`
- react-i18next for translations
- React Router for pages (Home, Products, Materials, Blog, Blog post, About, Contact)
- Formspree placeholder endpoint, Zod-validated form
- Clean component structure (Header, Footer, ProductCard, CategorySection, MaterialFilter, BlogCard, QuoteModal, LanguageSwitcher)
