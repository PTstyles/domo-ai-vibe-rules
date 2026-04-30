# Cobra Demo Engine

Rapid-fire micro-demo environment for building Domo assets. Each micro-demo is an independent, composable unit that can run standalone or chain with others in a single session.

## Quick Start

Open a Cursor chat in this workspace and type any of these:

```
"generate a star schema dataset in domo"
"generate a MagicETL dataflow based on those datasets"
"generate an app studio app based on those datasets"
"add 2 more pages to the app studio app"
"include a pro-code recharts plot on the overview page"
"generate a pitch deck for the demo"
```

The agent auto-selects a demo pack (industry vertical) and follows the appropriate micro-demo rule. Override the vertical or instance at any time:

```
"generate a star schema for healthcare (env: customer.domo.com)"
"which MagicETL dataflows broke in the last 24 hours?"
"which connectors are running long?"
```

See `canned-prompts.md` for all 30 ready-to-use prompts.

## Architecture

```
cobra-demo/
├── .cursor/rules/
│   ├── cobra-engine.mdc          ← Master config (always active)
│   ├── micro-star-schema.mdc     ← Star schema generation
│   ├── micro-magic-etl.mdc       ← Magic ETL dataflow
│   ├── micro-app-studio.mdc      ← App Studio app + pages
│   ├── micro-pro-code.mdc        ← Pro-code Recharts charts
│   ├── micro-pitch-deck.mdc      ← Pitch deck (HTML → PDF)
│   ├── obs-etl-health.mdc        ← ETL failure diagnosis + fix proposals
│   └── obs-connector-health.mdc  ← Connector health (broken, slow, stale)
├── demo-packs/
│   ├── manufacturing.md          ← Factory/production vertical
│   ├── healthcare.md             ← Hospital/health system vertical
│   ├── retail-ecommerce.md       ← Omnichannel retail vertical
│   ├── logistics.md              ← Freight/transportation vertical
│   └── financial-services.md     ← Banking/wealth management vertical
├── reference-charts/
│   └── overview-composed-chart/  ← Gold-standard ComposedChart (copy + adapt)
├── builds/                       ← All demo build output (delete anytime)
│   └── {vertical}-{YYYYMMDD}/   ← One dir per demo run
├── .env                          ← Auth token (git-ignored)
├── .gitignore
├── canned-prompts.md             ← 30 ready-to-use prompts
└── demo-build-process-summary.md ← This file
```

## Micro-Demo Catalog

### Build Demos

| Micro-Demo | What it builds | Primary Skill | Approx Time |
|---|---|---|---|
| **Star Schema** | 3 fact + 4 dimension tables uploaded to Domo | `domo-data-generator` | 2–4 min |
| **Magic ETL** | Dataflow joining star schema → 3 denormalized outputs | `magic-etl` | 2–3 min |
| **App Studio** | Multi-page app with theme, heroes, native cards, layout, nav | `app-studio`, `pb-apps-initial-build` | 5–10 min |
| **Pro-Code Plot** | Recharts visualization embedded in an App Studio page | `app-studio-pro-code`, `publish` | 3–5 min |
| **Pitch Deck** | 8–10 slide HTML deck → retina PDF | `html-deck` | 3–5 min |

### Observability Demos

| Micro-Demo | What it does | Rule |
|---|---|---|
| **ETL Health** | Lists failed ETL dataflows, traces errors to specific tiles, proposes fixes | `obs-etl-health.mdc` |
| **Connector Health** | Finds broken/slow/stale connectors, groups by error pattern, proposes fixes | `obs-connector-health.mdc` |

## Demo Packs

Each pack defines a complete industry configuration: star schema tables, ETL joins, App Studio pages, hero metrics, chart type assignments, and theme recommendation.

| Pack | Industry | Fact Tables | Pages |
|---|---|---|---|
| `manufacturing` | Industrial ops | work_orders, quality_inspections, material_consumption | Overview, Production, Quality, Supply Chain |
| `healthcare` | Hospital systems | patient_encounters, lab_results, billing_claims | Overview, Patient Care, Clinical Quality, Financial Performance |
| `retail-ecommerce` | Omnichannel retail | transactions, web_sessions, inventory_movements | Overview, Sales, Customers, Inventory |
| `logistics` | Freight & transport | shipments, fleet_events, warehouse_operations | Overview, Shipping, Fleet, Warehouse |
| `financial-services` | Banking & wealth | transactions, loan_applications, portfolio_positions | Overview, Revenue, Risk, Portfolio |

## Default Configuration

- **Instance**: `modocorp.domo.com` (override with `env:` in prompt)
- **Auto-selection order**: manufacturing → healthcare → retail-ecommerce → logistics → financial-services
- **Skills root**: `~/.agents/skills/`

## Dependency Chain

Micro-demos can run independently but have natural upstream dependencies:

```
star-schema ──→ magic-etl ──→ app-studio ──→ pro-code
                                    │
                                    └──→ pitch-deck
```

When running independently, the agent will search Domo for existing assets or ask for IDs.

## Skills Reference

| Skill | Path | Used By |
|---|---|---|
| `domo-data-generator` | `~/.agents/skills/domo-data-generator/SKILL.md` | Star Schema |
| `magic-etl` | `~/.agents/skills/magic-etl/SKILL.md` | Magic ETL |
| `pb-apps-initial-build` | `~/.agents/skills/pb-apps-initial-build/SKILL.md` | App Studio |
| `app-studio` | `~/.agents/skills/app-studio/SKILL.md` | App Studio, Pro-Code |
| `app-studio-pro-code` | `~/.agents/skills/app-studio-pro-code/SKILL.md` | Pro-Code |
| `domo-app-theme` | `~/.agents/skills/domo-app-theme/SKILL.md` | App Studio |
| `publish` | `~/.agents/skills/publish/SKILL.md` | Pro-Code |
| `manifest` | `~/.agents/skills/manifest/SKILL.md` | Pro-Code |
| `html-deck` | `~/.agents/skills/html-deck/SKILL.md` | Pitch Deck |
