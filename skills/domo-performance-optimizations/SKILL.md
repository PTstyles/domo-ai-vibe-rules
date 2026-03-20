---
name: domo-performance-optimizations
description: Performance rules for query shape, aggregation strategy, and payload minimization.
---

# Domo Performance Optimizations

## When to use
- Use when data fetching is slow or payloads are too large.

## Rules
- Never fetch full datasets blindly.
- Prefer server-side aggregation with `.groupBy()`.
- One optimized query per visualization.
- Use `.select()` for only necessary columns.

## Known limitations
- `.aggregate()` is unreliable in real scenarios; avoid it.
- `.groupBy()` requires a grouping column.
