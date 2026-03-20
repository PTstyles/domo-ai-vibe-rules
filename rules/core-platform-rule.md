---
description: Always-on high-level Domo App Platform guardrails and skill routing.
alwaysApply: true
---

# Domo App Platform Core Rule

## Platform constraints (always apply)
- Domo custom apps are client-side only static apps.
- Do not use SSR patterns (`getServerSideProps`, Remix loaders/actions, SvelteKit server files, Nuxt server routes, `pages/api`, `app/api`, `"use server"`).
- If SSR is detected, stop and explicitly recommend client-side refactor (React + Vite) or Code Engine for server logic.

## API boundary
- Use Domo App Platform APIs (`domo.js`, `@domoinc/query`, `@domoinc/toolkit`).
- Do not confuse with Domo public/product APIs unless explicitly requested.

## Build/routing non-negotiables
- Use relative asset base for Domo hosting (`base: './'`).
- Prefer `HashRouter` unless rewrite behavior is known and intentional.

## API index
- Data API
- AppDB
- AI Service Layer
- Code Engine
- Workflows
- Files / Filesets / Groups / User / Task Center

## Skill routing
- Dataset querying -> `skills/domo-dataset-query/SKILL.md`
- Data API overview -> `skills/domo-data-api/SKILL.md`
- domo.js usage -> `skills/domo-js/SKILL.md`
- Toolkit usage -> `skills/domo-toolkit-wrapper/SKILL.md`
- AppDB -> `skills/domo-appdb/SKILL.md`
- AI services -> `skills/domo-ai-service-layer/SKILL.md`
- Code Engine -> `skills/domo-code-engine/SKILL.md`
- Workflows -> `skills/domo-workflow/SKILL.md`
- Manifest wiring -> `skills/domo-manifest/SKILL.md`
- Build/publish -> `skills/domo-app-publish/SKILL.md`
- DA CLI -> `skills/domo-da-cli/SKILL.md`
- Migration from Lovable/v0 -> `skills/migrating-lovable-to-domo/SKILL.md`
- Migration from Google AI Studio -> `skills/migrating-googleai-to-domo/SKILL.md`
- Connector IDE -> `skills/domo-custom-connector-ide/SKILL.md`
- Performance -> `skills/domo-performance-optimizations/SKILL.md`
