# Gold-Standard: Overview ComposedChart

Source: `mfg-production-chart` (production-tested, user-approved)

This is the mandatory starting template for **Overview / main page** pro-code charts. Every line chart on an Overview page must be adapted from these files — never written from scratch.

## What makes this the gold standard

- **ComposedChart** with Actual (solid dark) + Plan (solid blue) + Forecast (dashed) + Confidence Band (gradient Area)
- **Aggregation toggle**: Daily / Weekly / Monthly with proper summing across periods
- **Confidence band toggle**: Show/hide the forecast uncertainty range
- **Custom tooltip**: Shows all series values with color-coded labels
- **Today reference line**: Dashed vertical line at current date
- **Manual footer legend**: Solid, dashed, and gradient box swatches (not Recharts built-in legend)
- **Loading state**: Animated 3x3 grid pulse
- **Error state**: Styled error with message
- **Dual data source**: `domo.get()` in Domo, `/api/data` locally
- **Filter support**: `domo.onFiltersUpdate` wrapped in try-catch
- **Professional CSS**: oklch colors, responsive, zero border-radius, transparent background

## How to adapt

1. Copy all 3 files into your new app directory
2. Change `DATASET_ALIAS` to match your manifest
3. Change `COLORS` object to match your theme palette
4. Change column names in `parseData()` to match your dataset
5. Change chart title and subtitle
6. Add `manifest.json` and `thumbnail.png`
