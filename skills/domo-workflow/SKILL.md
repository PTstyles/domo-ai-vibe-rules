---
name: domo-workflow
description: Start and monitor workflows via WorkflowClient with strict input variable matching.
---

# Rule: Domo App Platform Workflows (Toolkit-First)

This rule is **toolkit-first**. Use `WorkflowClient` for workflow operations in apps.

> Legacy endpoint-first guidance has been archived to `archive/legacy-rules/domo-workflow.md`.

## Canonical Client

```bash
yarn add @domoinc/toolkit
```

```typescript
import { WorkflowClient } from '@domoinc/toolkit';

const startResponse = await WorkflowClient.startModel('myWorkflow', {
  inputVar: 'value',
  anotherVar: 123
});
const instance = startResponse.body;
```

Check status:
```typescript
const statusResponse = await WorkflowClient.getInstance('myWorkflow', instance.id);
const status = statusResponse.body.status;
```

## Correct method usage (aliases, not UUIDs)

`WorkflowClient` workflow methods use the workflow **alias** from `manifest.json` `workflowMapping`, not the UUID.

```typescript
await WorkflowClient.startModel('myWorkflow', { inputVar: 'value' });
await WorkflowClient.getAllModels();          // or getAllModels(true)
await WorkflowClient.getModelDetails('myWorkflow');
await WorkflowClient.getInstance('myWorkflow', 'instance-id');
```

## Manifest Requirements

Workflows still require `workflowMapping` entries in `manifest.json`.

```json
{
  "workflowMapping": [
    {
      "alias": "sendReport",
      "modelId": "d1373fa7-9df8-45d3-80ba-f931dda169b4",
      "parameters": [
        { "aliasedName": "reportType", "type": "string", "list": false, "children": null },
        { "aliasedName": "recipients", "type": "string", "list": true, "children": null }
      ]
    }
  ]
}
```

## Error Handling Pattern

```typescript
async function runWorkflow(workflowAlias: string, payload: Record<string, unknown>) {
  try {
    const response = await WorkflowClient.startModel(workflowAlias, payload);
    return response.body;
  } catch (error) {
    console.error(`WorkflowClient.startModel failed for ${workflowAlias}`, error);
    throw error;
  }
}
```

## Canonical Rules References

- Toolkit workflow methods: `.cursor/rules/04-toolkit.mdc`
- Workflow mapping requirements: `.cursor/rules/06-manifest.mdc`
- Runtime caveats: `.cursor/rules/09-gotchas.mdc`

## Checklist
- [ ] `workflowMapping` is configured
- [ ] Calls use `WorkflowClient` alias-based methods (`startModel`, `getModelDetails`, `getInstance`)
- [ ] Code passes workflow aliases (from `workflowMapping.alias`) rather than workflow UUIDs
- [ ] Response parsing uses `response.body`
- [ ] Long-running workflow UX includes status checks or async user feedback
