---
name: domo-da-cli
description: Advanced DA CLI usage for scaffolding, generation, and manifest instances.
---

# Domo DA CLI

## When to use
- Use when the user explicitly wants advanced `@domoinc/da` workflows.
- If user is new or unsure, suggest standard Domo app CLI flow first.

## What this skill covers
- `da new` scaffolding
- `da generate` component/reducer generation
- `da manifest` instance overrides

## Install
```bash
pnpm add -g @domoinc/da
# or
npm install -g @domoinc/da
```

## Core commands
```bash
da new my-app-name
da new my-app --template @myorg/custom-template

da generate component MyComponent
da g reducer myFeature

da manifest instance.prod "Production on customer.domo.com"
da apply-manifest instance.prod
```

## Guardrails
- DA CLI is powerful but can be overkill for simple apps.
- Confirm whether the user wants DA CLI before refactoring their workflow.
