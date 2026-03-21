---
name: domo-ai-service-layer
description: Toolkit-first AIClient patterns for generation, text-to-sql, and response parsing.
---

# Rule: Domo App Platform AI (Toolkit-First)

This rule is **toolkit-first**. Use `AIClient` from `@domoinc/toolkit`.

> Legacy endpoint-first guidance has been archived to `archive/legacy-rules/domo-ai-endpoints.md`.

## Canonical Client

```bash
yarn add @domoinc/toolkit
```

```typescript
import { AIClient } from '@domoinc/toolkit';
```

## Text Generation

```typescript
const response = await AIClient.generate_text(
  'Explain this sales trend in simple terms',
  { template: 'You are a business analyst. ${input}' },
  { tone: 'professional' },
  undefined,
  { temperature: 0.7 }
);

const body = response.data || response.body || response;
const text = body.output || body.choices?.[0]?.output;
```

## Additional AI Methods

### `text_to_sql` schema argument must be an array

Wrong:
```typescript
await AIClient.text_to_sql('Show top vendors by spend', {
  dataSourceName: 'vendorPayments',
  columns: [{ name: 'amount', type: 'number' }]
});
```

Correct:
```typescript
await AIClient.text_to_sql('Show top vendors by spend', [
  {
    dataSourceName: 'vendorPayments',
    description: 'Vendor payment invoices',
    columns: [
      { name: 'vendor', type: 'string' },
      { name: 'amount', type: 'number' },
      { name: 'date', type: 'date' }
    ]
  }
]);
```

Signature reference:
```typescript
AIClient.text_to_sql(
  input: string,
  dataSourceSchemas?: DataSourceSchema[], // array
  promptTemplate?: any,
  parameters?: Record<string, string>,
  model?: string,
  modelConfiguration?: Record<string, Object>
): Promise<Response<TextAIResponse>>;
```

Why array: this supports multi-table SQL generation (including join-aware SQL) when multiple schemas are provided.

```typescript
const sqlResult = await AIClient.text_to_sql('Show total sales by region', [
  {
    dataSourceName: 'Sales',
    description: 'Sales transactions',
    columns: [{ name: 'region', type: 'string' }, { name: 'amount', type: 'number' }]
  }
]);

const beastModeResult = await AIClient.text_to_beastmode(
  'Calculate year over year growth percentage',
  { dataSourceName: 'Revenue', columns: [{ name: 'revenue', type: 'number' }, { name: 'date', type: 'date' }] }
);
```

## Response Handling Rule

`AIClient` responses are not always shaped like other toolkit clients:
- often uses `response.data`
- may include both `output` and `choices`

Always parse defensively:

```typescript
const body = response.data || response.body || response;
const output = body.output || body.choices?.[0]?.output;
```

## Canonical Rules References

- Toolkit AI methods and caveats: `.cursor/rules/04-toolkit.mdc`
- Naming/response gotchas: `.cursor/rules/09-gotchas.mdc`

## Checklist
- [ ] `AIClient` methods use snake_case (`generate_text`, `text_to_sql`, etc.)
- [ ] `AIClient.text_to_sql` second argument is `DataSourceSchema[]` (array), not a single object
- [ ] Responses parsed from `data`/`body` fallback
- [ ] Prefer `output`; fallback to `choices[0].output`
- [ ] Error handling and loading state in UI
