# Kotkot Design System (Production Enforcement)

## 1. Scope and Enforcement Contract
This specification is mandatory for:
- Marketing pages
- SEO pages
- Auth flows
- Dashboard UI

No route group may define parallel visual rules. All new UI must consume shared tokens and shared components.

### 1.1 Audit Remediation Matrix
This system is designed to permanently remove:
- CTA hierarchy conflict via semantic action tiers and button governance.
- Token drift via lintable token-only color/spacing/radius usage.
- Component duplication via centralized primitives and variant restrictions.
- Template monotony via controlled template family with structural variation constraints.
- Mobile inconsistency via mobile-first breakpoints and behavior rules.
- Design system fragmentation via single token + component source of truth.

---

## 2. Visual Philosophy (Operational, Not Decorative)
Kotkot UI must communicate **automation reliability + operational clarity**.

Non-negotiable interpretation:
1. High signal-to-noise layouts.
2. Emphasis on action clarity (what user should do next).
3. Trust cues integrated near decisions (forms, pricing, activation steps).
4. Minimal decorative variance; maximum structural consistency.

Any visual decision that does not improve:
- comprehension,
- conversion,
- trust, or
- task completion speed
is rejected.

---

## 3. Token System (Only Source of Visual Values)

## 3.1 Token Rules
- Allowed color values: **semantic CSS variables only**.
- Allowed spacing values: **defined spacing scale only**.
- Allowed radius values: **defined radius scale only**.
- Allowed shadows: **defined elevation tokens only**.
- Literal hex/rgb/hsl values in component/page code are forbidden.

### 3.2 Core Token Layers
1. **Reference tokens** (`--ref-*`): raw brand primitives (declared once).
2. **Semantic tokens** (`--color-*`, `--space-*`, `--radius-*`, `--elevation-*`, `--type-*`): app-facing tokens.
3. **Component tokens** (`--btn-*`, `--card-*`, `--field-*`): optional aliases that must map to semantic tokens.

Components may never consume `--ref-*` directly.

### 3.3 Required Semantic Color Tokens
```css
/* surfaces */
--color-surface-page
--color-surface-panel
--color-surface-elevated
--color-surface-inverse

/* text */
--color-text-primary
--color-text-secondary
--color-text-muted
--color-text-inverse

/* borders */
--color-border-subtle
--color-border-default
--color-border-strong

/* actions */
--color-action-primary-bg
--color-action-primary-fg
--color-action-primary-hover
--color-action-secondary-bg
--color-action-secondary-fg
--color-action-tertiary-fg

/* semantic states */
--color-success-bg
--color-success-fg
--color-warning-bg
--color-warning-fg
--color-danger-bg
--color-danger-fg
--color-info-bg
--color-info-fg

/* focus */
--color-focus-ring
```

### 3.4 Color Usage Constraints
- Primary action color appears on max 1 dominant CTA per viewport section.
- Lime accent cannot be used as background for informational sections unless section is explicitly action-oriented.
- Warning/danger colors are reserved for state feedback and destructive operations.

---

## 4. Typography System (Finite + Enforced)

## 4.1 Type Scale Tokens
Only these sizes are allowed:
- 12, 14, 16, 20, 24, 32, 40, 56

Mapped tokens:
- `--type-label-sm`: 12
- `--type-body-sm`: 14
- `--type-body-md`: 16
- `--type-heading-sm`: 20
- `--type-heading-md`: 24
- `--type-heading-lg`: 32
- `--type-display-sm`: 40
- `--type-display-lg`: 56

No arbitrary text size utilities outside this list.

### 4.2 Heading Application Rules
- Exactly one H1 per page.
- H2 introduces top-level sections only.
- H3 may only exist inside an H2 section.
- Heading jumps (H2 → H4) are forbidden.

### 4.3 Readability Constraints
- Marketing/SEO body max line length: 72ch.
- Docs/help body max line length: 80ch with TOC.
- Dashboard dense text max line length: 64ch in side panels.

---

## 5. Spacing System
Allowed spacing scale:
`4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96`

Rules:
- Section vertical spacing: only 64 / 80 / 96 desktop, 40 / 48 / 64 mobile.
- Card internal padding: only 16 / 24 / 32.
- Form vertical rhythm: 8 between label/help/error, 16 between fields, 24 between field groups.
- One-off margins/paddings are forbidden.

---

## 6. Radius Standardization
Allowed radius tokens only:
- `--radius-sm: 8`
- `--radius-md: 12`
- `--radius-lg: 16`
- `--radius-pill: 9999`

Usage:
- Inputs/buttons: `md`
- Cards/panels: `lg`
- Badges/chips: `pill` or `sm`

10px, 14px, and ad-hoc mixed radii are disallowed.

---

## 7. Elevation and Shadow Rules
Allowed elevation tokens:
- `--elevation-0`: none
- `--elevation-1`: subtle border-emphasis shadow
- `--elevation-2`: interactive card hover
- `--elevation-3`: overlays, dropdowns, modals

Rules:
- Marketing sections default to `elevation-0`.
- Cards default to `elevation-1`; hoverable cards may use `elevation-2` on hover only.
- Persistent heavy shadows on static content are forbidden.

---

## 8. CTA Hierarchy Model (Global)
All CTAs map to one intent tier:
1. **Primary CTA**: B2B demo/contact sales.
2. **Secondary CTA**: product exploration (features, docs, case study).
3. **Tertiary CTA**: lightweight actions (WhatsApp quote, learn more, back links).

Rules:
- One primary CTA per section.
- Max two visible high-emphasis CTAs in hero.
- Tertiary CTAs must not visually match primary/secondary styling.

---

## 9. Token Governance (Anti-Drift)

### 9.1 Required CI Checks
- Fail build if hex/rgb/hsl detected outside token declaration files.
- Fail build if unauthorized spacing/radius values detected.
- Fail build if non-approved typography sizes detected.

### 9.2 Change Control
Any new token requires:
- written use case,
- impacted components,
- migration plan for existing near-duplicate tokens.

No token may be added to solve one page-only exception.

### 9.3 Component Compliance
A component is mergeable only if:
- uses semantic tokens exclusively,
- implements focus-visible and disabled states,
- does not duplicate an existing primitive.
