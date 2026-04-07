# Domo App Studio Theme Catalog

31 production-ready DESIGN.md theme files. Each contains a complete design system: color palette with slot mapping, typography, card styles, navigation, chart series, agent prompt guide, and importable App Studio Theme JSON.

## Theme Index

### Production Themes (4 original)

| Theme | Mode | Accent Family | Font | File |
|-------|------|--------------|------|------|
| Corporate Light | Light | Cool blue-gray | Sans | `corporate-light.DESIGN.md` |
| Charcoal Ember Dark | Dark | Warm ember/orange | Sans | `charcoal-ember-dark.DESIGN.md` |
| Emerald Dark | Dark | Emerald green | Sans | `emerald-dark.DESIGN.md` |
| Neon Magenta Dark | Dark | Hot pink/magenta | Sans | `neon-magenta-dark.DESIGN.md` |

### Extracted Themes (2 from production JSON)

| Theme | Mode | Accent Family | Font | File |
|-------|------|--------------|------|------|
| BC Forest Light | Light | Deep forest green | Sans | `bc-forest-light.DESIGN.md` |
| CH Charcoal Light | Light | Warm charcoal + lavender/steel/teal | Mono title / Condensed caption / Sans | `ch-charcoal-light.DESIGN.md` |

### Expanded Catalog (17 new)

#### Dark Counterparts

| Theme | Mode | Accent Family | Font | File |
|-------|------|--------------|------|------|
| BC Forest Dark | Dark | Mint green on forest black | Sans | `bc-forest-dark.DESIGN.md` |
| CH Charcoal Dark | Dark | Lavender/steel/teal on warm charcoal | Mono/Condensed/Sans | `ch-charcoal-dark.DESIGN.md` |

#### Warm Light Themes

| Theme | Mode | Accent Family | Font | File |
|-------|------|--------------|------|------|
| Terracotta Sand | Light | Desert terracotta + dusty peach | Serif | `terracotta-sand.DESIGN.md` |
| Copper Patina | Light | Verdigris teal + copper | Sans | `copper-patina.DESIGN.md` |
| Blush Rose | Light | Dusty rose + warm gold | Serif title / Sans body | `blush-rose.DESIGN.md` |

#### Cool Professional Themes

| Theme | Mode | Accent Family | Font | File |
|-------|------|--------------|------|------|
| Midnight Navy | Light | Steel blue on ice canvas | Condensed heading / Sans | `midnight-navy.DESIGN.md` |
| Slate Granite | Light | True neutral gray + mint teal | Sans + Mono numbers | `slate-granite.DESIGN.md` |
| Arctic Frost | Light | Ice blue, light nav | Sans | `arctic-frost.DESIGN.md` |

#### Bold & Saturated Themes

| Theme | Mode | Accent Family | Font | File |
|-------|------|--------------|------|------|
| Indigo Velvet | Dark | Lavender + gold | Sans | `indigo-velvet.DESIGN.md` |
| Burgundy Editorial | Light | Wine burgundy + antique gold | Serif (all) | `burgundy-editorial.DESIGN.md` |
| Electric Teal | Dark | Bright teal + coral | Monospace (all) | `electric-teal.DESIGN.md` |

#### Nature & Organic Themes

| Theme | Mode | Accent Family | Font | File |
|-------|------|--------------|------|------|
| Moss & Stone | Light | Olive + warm brown | Slab (all) | `moss-stone.DESIGN.md` |
| Ocean Kelp | Dark | Seaweed green + seafoam | Sans + Condensed | `ocean-kelp.DESIGN.md` |
| Golden Hour | Light | Golden amber + purple dusk | Serif (all) | `golden-hour.DESIGN.md` |

#### Technical & Data-Dense Themes

| Theme | Mode | Accent Family | Font | File |
|-------|------|--------------|------|------|
| Terminal Sage | Dark | Sage green on true black | Monospace (all) | `terminal-sage.DESIGN.md` |
| Blueprint | Light | Blueprint blue, borders not shadows | Condensed (all) | `blueprint.DESIGN.md` |
| Data Ink | Light | No decorative color (Tufte-inspired) | Serif body / Sans labels | `data-ink.DESIGN.md` |

### Subgenre Themes (8)

| Theme | Mode | File |
|-------|------|------|
| Cyberpunk | Dark | `cyberpunk.DESIGN.md` |
| Solarpunk | Light | `solarpunk.DESIGN.md` |
| Steampunk | Light | `steampunk.DESIGN.md` |
| Atompunk | Light | `atompunk.DESIGN.md` |
| Biopunk | Dark | `biopunk.DESIGN.md` |
| Dieselpunk | Dark | `dieselpunk.DESIGN.md` |
| Dreadpunk | Dark | `dreadpunk.DESIGN.md` |
| Dungeonpunk | Dark | `dungeonpunk.DESIGN.md` |

## Coverage Matrix

| Dimension | Count |
|-----------|-------|
| Total themes | 31 |
| Light mode | 15 |
| Dark mode | 16 |
| Sans font | 16 |
| Serif font | 4 |
| Slab font | 2 |
| Monospace font | 3 |
| Condensed font | 2 |
| Mixed font families | 4 |

## How to Use

1. Pick a theme from the catalog above
2. Read the full DESIGN.md for the complete design system specification
3. Import the Theme JSON (Section 8 in each file) into App Studio via the PUT theme endpoint
4. Use the Pro-Code COLORS object (Section 7) in all pro-code components
5. Match the font family CSS stack to the theme's font setting
