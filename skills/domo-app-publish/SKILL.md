---
name: domo-app-publish
description: Build and publish Domo apps with dist workflow and first-publish ID handling.
---

# Domo App Publish

## When to use
- Use when setting up or troubleshooting build/publish for Domo custom apps.
- Use when DA CLI is not the chosen workflow.

## Standard workflow
```bash
npm install
npm run dev
npm run build
cd dist
domo login
domo publish
```

## First publish rule
- Domo generates app `id` on first publish.
- Copy that `id` from `dist/manifest.json` back to source `manifest.json`.
- If not copied, every publish creates a new app.

## Checklist
- `manifest.json` has `dataSetId` and `fields: []` in dataset mappings
- `thumbnail.png` exists alongside manifest
- Vite base is `./`
