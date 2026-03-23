---
name: pb-apps-initial-build
description: Starting sequence for new Domo custom app builds, including which rules and skills to apply first.
---

# Domo App Initial Build Playbook

## When to use
- Use at project kickoff for a brand-new Domo custom app.
- Use when taking over an existing app and normalizing it to platform best practices.

## Apply these rules first (always-on)
- `rules/core-custom-apps-rule.md`
- `rules/custom-app-gotchas.md`

## Recommended skill order for initial build
1. `cap-apps-manifest` - define mappings/contracts first.
2. `cap-apps-domo-js` - baseline app shell, navigation, events, environment usage.
3. `cap-apps-dataset-query` (and `cap-apps-data-api`) - data access with query-first patterns.
4. `cap-apps-appdb` - persistent app state/documents.
5. `cap-apps-toolkit` - move to typed toolkit clients where useful.
6. `cap-apps-ai-service-layer` / `cap-apps-code-engine` / `cap-apps-workflow` as needed by features.
7. `cap-apps-performance` before finalizing queries.
8. `cap-apps-publish` for release flow and first-publish ID handling.

## Build-time guardrails
- Client-side only: no SSR/server routes/server components.
- Use Vite `base: './'`.
- Prefer `HashRouter` unless rewrites are intentionally handled.
- Treat `domo.env.*` as convenience only; use verified identity for trust decisions.

## Explicitly separate from connector work
- Do **not** use this playbook for Domo Custom Connector IDE projects.
- Connector projects should use `cap-connector-dev` instead.
