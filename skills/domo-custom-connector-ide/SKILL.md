---
name: domo-custom-connector-ide
description: Patterns for Domo custom connector IDE auth, data processing, pagination, and parsing.
---

# Domo Custom Connector IDE

## When to use
- Use for connector development (`authentication.js`, `dataProcessing.js`) rather than custom apps.

## Core files
- `authentication.js`
- `dataProcessing.js`
- `README.md`

## Best practices
- Validate and sanitize inputs.
- Check HTTP status before parsing.
- Use `datagrid.magicParseJSON` for JSON array ingestion.
- Keep row schemas consistent across records.
