---
name: domo-code-engine
description: Execute Code Engine functions from apps using CodeEngineClient with manifest mapping constraints.
---

# Domo Code Engine

## When to use
- Use for secure server-side logic invocation from client apps.

## Canonical usage
```ts
import { CodeEngineClient } from '@domoinc/toolkit';
const response = await CodeEngineClient.execute('calculateTax', { amount: 1000, state: 'CA' });
const result = response.body.output;
```

## Contract rules
- `packageMapping` must define function alias and parameter schema.
- Payload keys/types must match configured function inputs exactly.
