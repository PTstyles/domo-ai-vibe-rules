# Default Theme Rule (Domo Custom Apps)

Apply the default Domo app theme below unless the user explicitly requests a different visual style.

## Default Policy

- Use this theme for all generated custom app UI work by default.
- Only deviate when the user gives a specific override.
- Keep functional correctness first; apply theme consistently across app shell, cards, filters, buttons, and status visuals.

## Design Contract

- Typography stack: `"Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif`
- Primary text: `#3F454D`
- Secondary text: `#68737F`
- Page background: `#F1F6FA`
- Card surface: `#FFFFFF`
- Border: `#B7C1CB`
- Light border/dividers: `#DCE4EA`
- Accent hover: `#99CCEE`

Status colors:

- On Track: `#ADD4C1`
- At Risk: `#FF9922`
- Behind: `#776CB0`
- Complete: `#99CCEE`

## Component Defaults

- Buttons: outlined default, dark active state, subtle hover border accent.
- Cards: white surface, subtle shadow, rounded corners.
- Badges: uppercase, 11px, tinted background + readable darker text.
- Progress bars: light track + status-colored fill.
- Inputs/selects: neutral border, accent border on hover.

## Layout Defaults

- Page padding: `24px`
- Max content width: `1400px`
- Grid gap: `16px`
- Card padding: `20px`

## Behavior Defaults

- Keep interactions subtle; avoid heavy motion.
- Prefer hierarchy by weight/spacing over saturated colors.
- Avoid pure black borders and overly sharp shadows.

## Source

Canonical full theme reference:
`/Users/chasekunz/Downloads/THEME.md`
