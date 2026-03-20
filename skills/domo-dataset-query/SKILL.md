---
name: domo-dataset-query
description: Query-first dataset access with @domoinc/query including filters, grouping, date grains, and performance constraints.
---

# Domo Dataset Query

## When to use
- Use for dataset reads and aggregations in Domo apps.
- Prefer `@domoinc/query` over raw SQL for page-filter-aware behavior.

## Install
```bash
yarn add @domoinc/query
```

## Critical rules
- Always use `.select()` with needed columns.
- Aggregation keys must be real dataset field names.
- Avoid `.aggregate()`; use `.groupBy()` or client-side reduction.
- `.groupBy()` must include a grouping column.

## Example
```ts
const rows = await new Query()
  .select(['region', 'Sales_Amount'])
  .groupBy('region', { Sales_Amount: 'sum' })
  .orderBy('Sales_Amount', 'descending')
  .fetch('sales');
```
