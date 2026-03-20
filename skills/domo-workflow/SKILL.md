---
name: domo-workflow
description: Start and monitor workflows via WorkflowClient with strict input variable matching.
---

# Domo Workflow

## When to use
- Use when triggering Domo workflows from app code.

## Canonical usage
```ts
import { WorkflowClient } from '@domoinc/toolkit';
const start = await WorkflowClient.start('model-uuid', { inputVar: 'value' });
const status = await WorkflowClient.getInstance(start.body.id);
```

## Contract rules
- `workflowMapping` must exist in manifest.
- Payload keys and types must match workflow model variables exactly.
