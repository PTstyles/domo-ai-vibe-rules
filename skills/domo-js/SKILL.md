---
name: domo-js
description: Use ryuu.js (domo.js) APIs for env, events, navigation, and data calls.
---

# Domo JS

## When to use
- Use when code calls `domo.get/post/put/delete`, `domo.navigate`, or environment/event APIs.

## Install
```bash
npm install ryuu.js
```

## Required safety pattern
- Always import SDK in bundled apps:
```ts
import domo from 'ryuu.js';
```
- Do not rely on global `domo`.

## Common usage
```ts
domo.onFiltersUpdated((filters) => console.log(filters));
domo.navigate('/page/123456789', true);
const rows = await domo.get('/data/v1/sales');
```

## Security note
- `domo.env.userId` is spoofable; use `/domo/environment/v1/` or `IdentityClient` for trusted identity.
