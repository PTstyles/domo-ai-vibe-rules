---
name: domo-data-api
description: High-level entry skill for Domo data access. Routes detailed query work to domo-dataset-query.
---

# Domo Data API

## When to use
- Use as the entry point for data-fetching questions.
- For full query syntax and patterns, delegate to `domo-dataset-query`.

## Canonical approach
- Query-first: use `@domoinc/query`.
- SQL (`SqlClient`) is exception-only and does not auto-apply page filters.

## Manifest requirements
- Dataset aliases must exist in `datasetsMapping`.
- Include `fields: []` for each dataset mapping.
