# Cobra Demo — Canned Prompts (30 total)

Copy-paste any of these into a Cursor chat in this workspace. Each prompt is self-contained and triggers the appropriate micro-demo rule automatically.

---

## How to Use This System

### Getting started

- Open a **new Cursor chat** in this workspace — the master rule (`cobra-engine.mdc`) activates automatically and routes your prompt to the right micro-demo.
- Pick a prompt below, paste it, and go. No setup required beyond having `domo login` authenticated for your target instance.

### Sequential vs. standalone

- **Sequential (same chat)**: Run prompts in order (star schema → ETL → app studio → pro-code → deck). The agent carries dataset GUIDs, app IDs, and page IDs forward in conversation context — no need to repeat them.
- **Standalone (new chat)**: Any prompt works on its own. The agent will either look up existing assets in Domo by name or ask you for the IDs it needs.

### Controlling the vertical

- **Omit the vertical** and the system auto-selects one (rotates through manufacturing → healthcare → retail → logistics → financial-services).
- **Specify the vertical** by name in your prompt (e.g., "for healthcare") to lock in a specific demo pack.
- **Stay consistent** within a session — once a vertical is selected, subsequent prompts in the same chat continue with it unless you say otherwise.

### Controlling the instance

- Default target is `modocorp.domo.com`. Override by adding `(env: other.domo.com)` to any prompt.

### Compound prompts

- You can chain multiple steps in a single prompt (see prompts 5, 15, 16). The agent will execute them sequentially in one session.
- For maximum reliability, run one step at a time — especially if you want to inspect intermediate results before continuing.

### Observability prompts

- These don't build anything — they query your Domo instance and report back. Best used in a fresh chat so the output is clean.
- The agent proposes fixes for each issue found. You can then say "fix it" to apply the proposed changes, or copy the fix details for manual action.

### Tips

- If a step fails partway through, tell the agent what went wrong and it will retry on the **same** assets (never creates duplicates).
- Add context to any prompt to customize: "generate a star schema for healthcare — focus on outpatient encounters and telehealth" works fine.
- For observability, you can change the time window: "which ETL dataflows broke in the last 7 days?" or "which connectors failed since Monday?"

---

## Data Generation

**1. Quick star schema (auto-selects vertical)**

```
Generate a star schema dataset in Domo
```

**2. Star schema for a specific vertical**

```
Generate a star schema dataset for healthcare in Domo
```

**3. Star schema on a non-default instance**

```
Generate a star schema dataset for retail (env: customer.domo.com)
```

---

## Data Transformation

**4. Magic ETL from existing datasets**

```
Generate a MagicETL dataflow based on those datasets
```

**5. Star schema + ETL in one shot**

```
Generate a star schema for manufacturing and then create a MagicETL dataflow that joins it into 3 output datasets
```

---

## App Studio

**6. Create an App Studio app from datasets**

```
Generate an App Studio app based on those datasets
```

**7. Add pages to an existing app**

```
Add 3 more pages to the App Studio app
```

**8. Full app build from ETL outputs**

```
Build a complete App Studio app with theme, heroes, native charts, and navigation based on those ETL output datasets
```

---

## Pro-Code Visualizations

**9. Add a single pro-code chart**

```
Include a pro-code Recharts plot on the overview page
```

**10. Add pro-code charts to all pages**

```
Add a pro-code Recharts chart to every page in the App Studio app — use different chart types per page
```

---

## Pitch Deck

**11. Generate a pitch deck**

```
Generate a pitch deck for this demo
```

---

## Observability

**12. Broken ETL dataflows**

```
Which MagicETL dataflows broke in the last 24 hours and what's wrong with each of them?
```

**13. Long-running connectors**

```
Which connectors are currently running long on modocorp.domo.com?
```

**14. Broken connectors**

```
Which connectors broke or had issues updating in the last 8 hours? 
```

---

## Compound Workflows

**15. End-to-end demo (data → ETL → app → pro-code)**

```
Build a full demo for logistics: generate star schema, create MagicETL dataflow, build an App Studio app with pro-code charts on every page
```

**16. End-to-end with deck**

```
Build a complete financial services demo with star schema, ETL, App Studio app, pro-code charts, and a pitch deck
```

**17. Quick app from existing data**

```
There are datasets on modocorp.domo.com named "Sales Performance", "Customer Analytics", and "Inventory Health" — build an App Studio app with pro-code charts using those
```

---

## Pre-Built Data (Skip Star Schema + ETL)

The manufacturing star schema and ETL already exist on modocorp. Use these prompts to jump straight to building without generating data.

**Dataflow**: `MFG | Manufacturing Star Schema Join` (ID: 5497)

**Output datasets:**


| Dataset | GUID                              | Columns                                | Key fields |
| ------- | --------------------------------- | -------------------------------------- | ---------- |
| MFG     | Work Orders Denormalized          | `6b02d020-e68f-4839-b847-6916bcc05a85` | 43         |
| MFG     | Quality Inspections Denormalized  | `6095eeb7-94bd-4313-afa2-edee7a21b5ff` | 28         |
| MFG     | Material Consumption Denormalized | `7262bc3c-aa94-45ca-91c8-404c88cd6ed9` | 39         |


### Quick App Builds

**18. Full app from MFG data (fastest path)**

```
Build a complete manufacturing App Studio app with theme, heroes, native charts, pro-code Recharts on every page, and navigation — using the MFG denormalized output datasets that already exist on modocorp.domo.com
```

**19. App Studio only (no pro-code)**

```
Build an App Studio app for manufacturing using these existing datasets on modocorp.domo.com: "MFG | Work Orders Denormalized" (6b02d020-e68f-4839-b847-6916bcc05a85), "MFG | Quality Inspections Denormalized" (6095eeb7-94bd-4313-afa2-edee7a21b5ff), "MFG | Material Consumption Denormalized" (7262bc3c-aa94-45ca-91c8-404c88cd6ed9)
```

### Pro-Code Visualizations on MFG Data

**20. Pro-code charts on all pages**

```
Add pro-code Recharts charts to every page of the manufacturing App Studio app — use the MFG denormalized datasets. Different chart type per page.
```

**21. Forecast chart with confidence bands**

```
Add a pro-code ComposedChart to the Overview page showing Actuals vs Forecast with a confidence band — use UnitsProduced, ForecastUnits, ForecastLower, ForecastUpper from the Work Orders dataset. Include a day/week/month toggle and a "Today" reference line.
```

**22. Supplier performance bar chart**

```
Add a pro-code horizontal bar chart to the Supply Chain page showing supplier performance — use SupplierName, OnTimeDeliveryPct, QualityRating, and TotalCost from the Material Consumption dataset
```

### Single-Page & Incremental Demos

**23. Add one page to an existing app**

```
Add a Supply Chain page to the MFG App Studio app — use the Material Consumption Denormalized dataset for heroes (Total Cost, Waste Rate, Avg Quality Rating, Active Suppliers) and a native bar chart by supplier
```

**24. Hero metrics only**

```
Create 4 hero metric cards on the Overview page: Total Units Produced, Avg Cycle Time (minutes), Scrap Rate %, and Defect Count — using the Work Orders Denormalized dataset
```

**25. Filter cards only**

```
Add filter dropdown cards for PlantName, ProductCategory, and Shift to every page in the MFG App Studio app — low-profile style, height 6
```

### Theme & Styling

**26. Retheme an existing app**

```
Apply a dark industrial theme to the MFG App Studio app — charcoal backgrounds, zero border-radius, and update all pro-code chart colors to match
```

### Data Health on MFG

**27. Check the MFG ETL**

```
Is the MFG Manufacturing Star Schema Join dataflow (ID 5497) healthy? When did it last run and are the output datasets populated?
```

---

## Workspace Maintenance

**28. Clean up all build artifacts**

```
Delete everything under builds/ in this workspace
```

**29. Clean up a specific demo**

```
Delete builds/manufacturing-20260408
```

**30. What's in the workspace right now?**

```
List everything in the builds/ directory and tell me how much space each demo is using
```

