---
name: initial-build
description: Orchestrates a new Domo custom app build or existing-app takeover from scratch. Loads rules, sequences capability skills, and tracks progress through manifest, data, UI, and publish phases. Use when starting a new Domo app project, taking over an existing app, or normalizing an app to platform best practices.
---

# Domo App Initial Build Playbook

## When to use

- Use at project kickoff for a brand-new Domo custom app.
- Use when taking over an existing app and normalizing it to platform best practices.

## Progress checklist

Copy this checklist and update it as you work

```
Build Progress:
- [ ] Phase 0: Rules loaded
- [ ] Phase 1: Manifest & contracts
- [ ] Phase 2: App shell (domo.js)
- [ ] Phase 2b: App Studio integration (if embedded in App Studio)
- [ ] Phase 3: Data access
- [ ] Phase 4: App storage (if needed)
- [ ] Phase 5: Toolkit clients (if needed)
- [ ] Phase 6: Feature skills (AI / Code Engine / Workflow — as needed)
- [ ] Phase 7: Performance review
- [ ] Phase 8: Build & publish
- [ ] Phase 9: Verification
```

## Phase 0 — Load rules (always-on)

Apply before writing any code:

- `rules/core-custom-apps-rule.md`
- `rules/custom-app-gotchas.md`

## Phase 1 — Manifest & contracts

Use `manifest`.

Define all external resource mappings first — datasets, collections, workflows, Code Engine packages. Everything else depends on this.
Use alias-safe names only (`^[A-Za-z][A-Za-z0-9]*$`), no spaces or special characters.

In addition to creation of the manifest.json, check root folder for an existing thumbnail.png to copy into the public folder of the new app.

**Existing-app takeover?** Audit the current `manifest.json` against actual code usage before changing anything.

## Phase 2 — App shell

Use `domo-js`.

Set up the baseline: `ryuu.js` import, navigation via `domo.navigate()`, event listeners, environment info.

**Advanced users using DA CLI?** Ask the agent to also use `da-cli` for scaffolding and manifest instance workflows. Should not be used unless user explicitly asks agent to use it.

## Phase 2b — App Studio integration (if embedded in App Studio)

Use `app-studio-pro-code`.

**Skip this phase** if the app is a standalone full-page app. Use this phase when the custom app will be placed as a card inside an App Studio page.

Wire up event listeners so the app reacts to the surrounding App Studio environment:

- **Page filters**: Register `domo.onFiltersUpdated` at the top level. Filter objects use `operand` (not `operator`) with values like `BETWEEN`, `IN`, `GREATER_THAN_EQUAL`. Map column names to internal state, then refetch data immediately.
- **Variables**: Register `domo.onVariablesUpdated` at the top level. Variables arrive keyed by numeric function ID strings (e.g., `"858"`) with values at `parsedExpression.value`. Use a pending/commit pattern — stage changes, commit on Apply, then refetch.
- **Variable write-back**: Use `domo.requestVariablesUpdate([{ functionId, value }], onAck, onReply)` for dependent dropdowns. Guard with an `isUpdatingVariable` flag to prevent infinite loops.
- **Theme alignment**: Use `domo-app-theme` as the base CSS. Set body background to `transparent` or `--bg` to blend with the App Studio canvas.

**Default pro-code chart strategy** (see `app-studio-pro-code` for full details):

- **Main/Overview page**: Multi-line time-based `ComposedChart` (Recharts) with Actuals vs. Plan/Prior Period + Forecast (dashed), confidence interval band (`Area`), day/week/month aggregation toggle, "Today" reference line, and custom tooltip. This is the default — never use a bar chart or other type on the main page.
- **Sub-pages**: Time-based `BarChart` by default (same date axis, same aggregation toggle). Only use category-axis or alternative chart types when the page data has no meaningful time dimension.
- **Libraries**: Default to React + Recharts via esm.sh import maps (no build step). Fall back to Chart.js vanilla when React is unnecessary. See `app-studio-pro-code` "Default Library Selection" for the decision table.
- **All pages must include**: day/week/month toggle, confidence band toggle (when applicable), "Today" vertical reference line, custom footer legend, shared `aggregateData()` function.

See `app-studio-pro-code` for the full filter/variable integration reference, including production-tested code patterns.

## Phase 3 — Data access (if domo datasets need to be queried)

Use `dataset-query` (primary) and `data-api` (routing overview).

Build queries with `@domoinc/query`. Use the Query API for all dataset reads — it respects page filters and does server-side aggregation.

Before writing UI/data-mapping logic, fetch the real schema for every dataset in `manifest.json datasetsMapping` and create an explicit field map (date field, primary metric(s), dimension fields). Do not rely on guessed names like `sales`, `category`, or `order date` unless confirmed in schema.

If required fields are missing for the requested visualization, fail fast with a clear mapping error instead of rendering zeros.

**Need raw SQL?** Use `sql-query`, but know that SQL ignores page filters.

**Explicit filter handling for non-Query data access**: If the app uses Code Engine calls, stored procedures, or raw SQL instead of `@domoinc/query`, page filters will NOT be applied automatically. You must register `domo.onFiltersUpdated` (see Phase 2b) and pass filter values as parameters to your data source manually.

## Phase 4 — App storage (if appdb , or any user data entry is needed)

Use `appdb` and `appdb-collection-create` when storage must be created.

Skip if the app only reads datasets. Use AppDB when you need to persist app-specific state, user preferences, or document-style data.

If required collections do not exist yet, run `appdb-collection-create` first to provision datastore+collection before wiring document CRUD.

## Phase 5 — Toolkit clients (if appdb, domo workflows, or domo sql query is needed)

Use `toolkit`.

Move to typed `@domoinc/toolkit` clients where they add value (structured responses, type safety). Not required for simple apps.

## Phase 6 — Feature skills (as needed)

Only load the skills your app actually requires (3 examples are listed here but you have access to many more skills):


| Feature needed                                 | Skill                                                       |
| ---------------------------------------------- | ----------------------------------------------------------- |
| AI text generation or text-to-SQL              | `ai-service-layer`                                          |
| Server-side functions (secrets, external APIs) | `code-engine` + `code-engine-create` + `code-engine-update` |
| Triggering automation workflows                | `workflow`                                                  |


**Decision guide:** If the user hasn't mentioned AI, Code Engine, or Workflows, skip this phase entirely. Don't add complexity the app doesn't need.

**Non-optional trigger for server functions:** If app functionality requires server-side behavior (secrets, external API calls, privileged transformations), create or update a Code Engine package first, then sync `manifest.json packagesMapping`, and only then wire runtime invocation in app code.

## Phase 7 — Performance review

Use `performance`.

Review all queries before finalizing. Check for full-dataset fetches, missing aggregations, and unnecessary columns.

## Phase 8 — Build & publish

Use `publish`.

`npm run build` → `cd dist` → `domo publish`. On first publish, copy the generated `id` back to your source manifest.

## Phase 9 — Verification

After publishing, confirm:

- App loads without console errors in Domo
- All dataset aliases resolve (no 404s on data calls)
- AppDB collections are wired in the card UI (if used)
- Page filters propagate correctly (if app is embedded in a dashboard)
- Navigation uses `domo.navigate()`, not `<a href>`
- Thumbnail has been copied into public folder

## Build-time guardrails

- Client-side only: no SSR/server routes/server components.
- Use Vite `base: './'`.
- Prefer `HashRouter` unless rewrites are intentionally handled.
- Treat `domo.env.`* as convenience only; use verified identity for trust decisions.

