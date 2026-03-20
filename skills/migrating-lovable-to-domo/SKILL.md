---
name: migrating-lovable-to-domo
description: Convert SSR-heavy Lovable/v0 apps into client-only Domo apps.
---

# Migrate Lovable/v0 to Domo

## When to use
- Use when generated apps include Next/Remix/SvelteKit SSR patterns.

## Core flow
1. Detect and remove SSR (`getServerSideProps`, loaders, API routes)
2. Replace backend fetches with Domo APIs (`ryuu.js`, `@domoinc/query`, `@domoinc/toolkit`)
3. Switch routing to `HashRouter`
4. Set Vite `base: './'`
5. Port components into Domo-compatible structure

## Important
- DA CLI is not an auto-converter. It helps scaffold and generate structure only.
