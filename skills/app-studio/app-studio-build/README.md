# App Studio Build Skill

Step-by-step orchestrator for building Domo App Studio apps with native KPI cards. CLI-first via `community-domo-cli`.

## Skill Structure

```
app-studio-build/
├── SKILL.md    — 8-step build procedure: app, pages, theme, heroes, charts, filters, layout, nav
└── README.md   — This file
```

## How to Use

Read `SKILL.md` and follow Steps 1–8 in order. The skill delegates to:

- **`basic-app-studio`** — CLI command syntax, response shapes, layout API details
- **`card-creation`** — Card body schema, chart type index, per-chart-type reference files
- **`domo-app-theme`** — Color palettes and theme system

Hero metric and filter card recipes are inlined in the skill (Steps 3 and 5) because they have specific failure modes that agents need at invocation time.

## When to Use This Skill

- Building a new App Studio app with native KPI cards
- Adding pages to an existing App Studio app
- Any dashboard build that uses Domo's native chart types (not pro-code)

For pro-code custom apps (React/Vite), use `basic-custom-app-build` instead.
