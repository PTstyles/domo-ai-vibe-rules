---
name: domo-appdb
description: Toolkit-first AppDB document CRUD, query operators, and collection wiring.
---

# Domo AppDB

## When to use
- Use for app persistence in collections.

## Canonical client
```ts
import { AppDBClient } from '@domoinc/toolkit';
const client = new AppDBClient.DocumentsClient('TasksCollection');
```

## Core operations
- `create`, `get`, `update`, `partialUpdate`, `delete`
- query operators like `$eq`, `$in`, `$and`, `$set`

## Manifest requirement
- Collections must be declared under `manifest.json` -> `collections`.
