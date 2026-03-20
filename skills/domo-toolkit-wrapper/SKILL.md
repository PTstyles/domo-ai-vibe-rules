---
name: domo-toolkit-wrapper
description: Toolkit client usage for AIClient, AppDBClient, WorkflowClient, and CodeEngineClient.
---

# Domo Toolkit Wrapper

## When to use
- Use when implementing with `@domoinc/toolkit` clients.

## Key client rules
- `AIClient` methods are snake_case (`generate_text`, `text_to_sql`).
- Parse AI responses defensively: `response.data || response.body || response`.
- `AppDBClient.DocumentsClient` must be instantiated.
- `WorkflowClient` and `CodeEngineClient` responses are in `response.body`.

## Examples
```ts
const aiBody = res.data || res.body || res;
const text = aiBody.output || aiBody.choices?.[0]?.output;

const client = new AppDBClient.DocumentsClient('Tasks');
const docs = await client.get();
```

## Manifest dependency
- Toolkit calls still require correct `manifest.json` wiring (`collections`, `workflowMapping`, `packageMapping`).
