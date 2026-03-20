---
name: migrating-googleai-to-domo
description: Convert Google AI Studio-origin apps to static Domo deployment contract.
---

# Migrate Google AI Studio to Domo

## When to use
- Use when a project came from AI Studio / Cloud Run style setup.

## Target contract
1. `npm run build` produces `dist/`
2. `cd dist && domo publish` works
3. app works from subpath hosting

## Migration checklist
- Standardize build scripts (prefer Vite)
- Set Vite base to `./`
- Use `HashRouter` if rewrite support is unknown
- Remove client-side secret assumptions
- Ensure manifest/config assets are present in `dist/`
