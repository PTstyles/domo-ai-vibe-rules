---
name: domo-custom-connector-ide
description: Patterns for Domo Custom Connector IDE work only (not Domo App Platform custom apps).
---

# Domo Custom Connector IDE

## When to use
- Use only for Domo Custom Connector IDE development (`authentication.js`, `dataProcessing.js`).
- This is **not** for Domo App Platform custom apps.
- If building a Domo app/card, use app skills like `domo-app-initial-build-playbook`, `domo-js`, and `domo-manifest`.

## Core files
- `authentication.js`
- `dataProcessing.js`
- `README.md`

## Best practices
- Validate and sanitize inputs.
- Check HTTP status before parsing.
- Use `datagrid.magicParseJSON` for JSON array ingestion.
- Keep row schemas consistent across records.
