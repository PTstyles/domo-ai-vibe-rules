---
name: domo-manifest
description: Configure manifest.json mappings for datasets, collections, workflows, and code engine.
---

# Domo Manifest

## When to use
- Use for any manifest wiring changes.

## Required structure
- `datasetsMapping` entries with `alias`, `dataSetId`, and `fields: []`
- `collections` for AppDB
- `workflowMapping` for workflows
- `packageMapping` for Code Engine

## Gotchas
- Missing `fields` can trigger manifest parsing failures.
- `thumbnail.png` is required with manifest at publish time.
