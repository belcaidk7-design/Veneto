# Admin SEO – plan d'implémentation

## Objectif
Créer une zone admin protégée par login `/admin/seo` pour éditer tous les contenus SEO (articles, produits, pages statiques, FAQ, auteurs/E-E-A-T) en EN/IT/FR/DE, sans passer par le chat.

## Stack
- **Lovable Cloud** (auth email/password + base Postgres + RLS)
- **Pas de signup public** : un seul compte admin, créé manuellement, identifié par un rôle `admin` (table `user_roles` séparée, jamais sur `profiles`)
- Frontend React existant (shadcn + Tailwind + i18n)

## Architecture base de données

```text
user_roles (user_id, role)              -- rôle "admin" uniquement
seo_pages (key, lang, ...)              -- SEO des pages statiques (home, products, contact…)
seo_blog_posts (slug, lang, ...)        -- SEO + contenu articles (title, body, faq[], sources[])
seo_products (product_id, lang, ...)    -- SEO par fiche produit
seo_faq (page, lang, items[])           -- FAQ Contact / Products
authors (id, name, bio_*, avatar, links)-- auteurs E-E-A-T (multi-langue)
```

Toutes les tables : RLS activée. Lecture publique pour le contenu SEO (le site doit l'afficher), écriture réservée à `has_role(auth.uid(), 'admin')`.

## Migration du contenu existant
Les contenus actuellement dans `src/i18n/locales/*.ts` (articles, FAQ, SEO pages) seront **seedés** en base via une migration initiale. Les locales gardent uniquement l'UI (boutons, labels, navigation).

## Chargement côté site
- Hook `useSeoContent(key, lang)` qui lit la table correspondante via Supabase client
- Cache via React Query
- Les pages publiques (Blog, BlogPost, Products, Contact, Home) consomment ce hook au lieu de `t()` pour les champs SEO
- Fallback automatique sur EN si la traduction manque

## Interface Admin

Routes (toutes protégées par `<AdminGuard>`) :
- `/admin/login` – formulaire email/password
- `/admin` – tableau de bord (compteurs : N articles, N produits, traductions manquantes…)
- `/admin/blog` – liste articles + bouton "Nouveau"
- `/admin/blog/:slug` – éditeur tabs EN/IT/FR/DE (title, slug, excerpt, body markdown, image, alt, dates, FAQ, sources, seoTitle, seoDescription)
- `/admin/pages` – éditeur pages statiques (title, meta, OG image, alt) par langue
- `/admin/products` – idem par fiche produit
- `/admin/faq` – éditeur des FAQ Contact / Products
- `/admin/authors` – CRUD auteurs (nom, bio multi-langue, avatar, liens sociaux/sources)

UI : shadcn `Tabs` (langues), `Form` + `Textarea`/`Input`, preview live à droite, bouton "Enregistrer" qui upsert en DB.

## Sécurité
- Pas de signup ouvert (`disable_sign_up=true` ou simplement pas de page signup)
- Compte admin créé via SQL après première connexion (insertion dans `user_roles`)
- Toutes les mutations vérifient `has_role` côté RLS
- Aucun rôle stocké dans `profiles` ou `localStorage`

## Étapes d'implémentation

1. **Activer Lovable Cloud** + créer le schéma (enum `app_role`, tables ci-dessus, RLS, fonction `has_role`)
2. **Seed** : migration qui copie le contenu actuel des locales TS vers la DB
3. **Auth** : page `/admin/login`, hook `useAuth`, `<AdminGuard>`, `useIsAdmin()`
4. **Hooks de lecture publique** (`useSeoContent`, `useBlogPost`, `useProductSeo`…)
5. **Refactor pages publiques** pour consommer la DB au lieu des locales (champs SEO uniquement)
6. **UI Admin** : layout + sidebar + 5 éditeurs (blog, pages, produits, FAQ, auteurs)
7. **Tests** : maj du test sitemap pour lire depuis la DB ; ajout test RLS basique
8. **Doc** : courte note pour expliquer comment créer le premier admin (insert SQL guidé)

## Notes
- Les **slugs** restent stables : changer un slug crée une redirection plutôt que casser l'URL (peut être ajouté en v2)
- L'éditeur body utilise une simple `Textarea` avec syntaxe markdown `## / ###` déjà supportée par `BlogPost.tsx` ; pas de WYSIWYG en v1
- Volume d'écriture très faible → pas besoin de cache invalidation sophistiquée, un `queryClient.invalidateQueries` après save suffit

## Hors périmètre (v2 possibles)
- Versioning / historique des modifs
- Workflow review/publish (draft vs published)
- Upload d'images directement dans l'admin (v1 : URL à coller)
- Plusieurs éditeurs avec rôles différents