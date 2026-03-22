---
name: domo-code-engine
description: Execute Code Engine functions from apps using CodeEngineClient with manifest mapping constraints.
---

# Rule: Domo App Platform Code Engine (Toolkit-First)

This rule is **toolkit-first**. Use `CodeEngineClient.runFunction(...)` for Code Engine execution from apps.

> Legacy endpoint-first guidance has been archived to `archive/legacy-rules/domo-code-engine.md`.

## Canonical Client

```bash
yarn add @domoinc/toolkit
```

```typescript
import { CodeEngineClient } from '@domoinc/toolkit';

const packageId = '12a45bc8-12de-fg67-891h-12ij567891kl';
const version = '0.1.0';
const functionName = 'calculateTax';

const response = await CodeEngineClient.runFunction(
  packageId,
  version,
  functionName,
  { amount: 1000, state: 'CA' }
);
const result = response?.body ?? response?.data ?? response;
```

## `runFunction` signature

```typescript
CodeEngineClient.runFunction(
  packageId: string,
  version: string,
  functionName: string,
  inputs: Record<string, any>,
  options?: { parts?: FunctionParts[] }
): Promise<any>;
```

## Required contract disclosure to user

When recommending or generating `CodeEngineClient.runFunction(...)` usage, the agent must explicitly tell the user:
- exact input parameter names and types sent in `inputs`
- expected output shape and types returned by the function

This is required so the user can implement a matching Code Engine function contract.

## Error Handling Pattern

```typescript
async function executeFunction(
  packageId: string,
  version: string,
  functionName: string,
  payload: Record<string, unknown>
) {
  try {
    const response = await CodeEngineClient.runFunction(
      packageId,
      version,
      functionName,
      payload
    );
    return response?.body ?? response?.data ?? response;
  } catch (error) {
    console.error(
      `CodeEngineClient.runFunction failed for ${packageId}@${version}#${functionName}`,
      error
    );
    throw error;
  }
}
```

## Canonical Rules References

- Toolkit patterns: `.cursor/rules/04-toolkit.mdc`
- Manifest mapping details: `.cursor/rules/06-manifest.mdc`
- Operational gotchas: `.cursor/rules/09-gotchas.mdc`

## Checklist
- [ ] Calls use `CodeEngineClient.runFunction(packageId, version, functionName, inputs)`
- [ ] `packageId`, `version`, and `functionName` are correct for the deployed function
- [ ] Inputs match the function contract
- [ ] Agent states exact input parameter names/types for `runFunction` calls
- [ ] Agent states expected output shape/types for the function response
- [ ] Output parsing handles `body`/`data`/raw response shape
- [ ] Errors handled and surfaced to UI or logs
