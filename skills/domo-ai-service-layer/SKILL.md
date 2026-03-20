---
name: domo-ai-service-layer
description: Toolkit-first AIClient patterns for generation, text-to-sql, and response parsing.
---

# Domo AI Service Layer

## When to use
- Use for AI features in Domo apps.

## Canonical client
```ts
import { AIClient } from '@domoinc/toolkit';
```

## Parsing rule
```ts
const body = response.data || response.body || response;
const output = body.output || body.choices?.[0]?.output;
```

## Method naming
- Use snake_case methods (`generate_text`, `text_to_sql`, `text_to_beastmode`).
