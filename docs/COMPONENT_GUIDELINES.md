# Component Guidelines (Single Source of Truth)

This document defines canonical components that replace duplicated implementations across marketing, SEO, auth, and dashboard.

## 1. Global Enforcement
- Only approved variants in this file are allowed.
- Components must be imported from shared UI packages; local visual forks are forbidden.
- Every interactive component must implement: default, hover, focus-visible, disabled, loading (if applicable).

---

## 2. Buttons

## 2.1 Variants (Only 3)
1. **Primary**: high-emphasis conversion actions.
2. **Secondary**: supportive, non-dominant actions.
3. **Tertiary**: low-emphasis text/ghost actions.

No “dark”, “lime-alt”, or route-specific button variants.

### 2.2 Sizes
- `sm` (compact UI), `md` (default), `lg` (hero/forms).

### 2.3 Usage Rules
- Hero: max 1 primary + 1 secondary.
- Section blocks: max 1 primary.
- Dense dashboard card: default to secondary/tertiary unless action is critical.

### 2.4 Forbidden Patterns
- Multiple primary buttons side-by-side.
- Anchor tags styled ad-hoc as custom buttons.
- Primary CTA used for non-conversion actions.

---

## 3. Forms (Unified Field System)

## 3.1 Required Primitives
- `Field`
- `FieldLabel`
- `FieldControl` (input/select/textarea)
- `FieldHint`
- `FieldError`
- `FieldGroup`
- `ValidationSummary`

### 3.2 States
- default
- focus
- filled
- invalid
- disabled
- success

### 3.3 Usage Rules
- Every field must have label and programmatic association.
- Error text must appear inline and in validation summary on submit failures.
- Password fields must expose criteria checklist before submit.

### 3.4 Forbidden Patterns
- Inputs without labels.
- Custom focus rings outside token system.
- Mixed validation copy patterns on same form.

---

## 4. Cards

## 4.1 Canonical Variants
1. **Marketing Card**: narrative/benefit blocks.
2. **SEO Card**: category/listing blocks with metadata.
3. **Dashboard Card**: KPI/data/action blocks.

### 4.2 States
- default
- hover (interactive only)
- selected (filter/comparison)
- disabled (when unavailable)

### 4.3 Usage Rules
- Each page may use max 2 card variants.
- SEO pages must alternate at least one non-card module every 2 card rows (table, checklist, FAQ accordion, comparison strip).
- Dashboard cards must include explicit title + value/action anchor.

### 4.4 Forbidden Patterns
- One-off card border/radius/shadow combos.
- Marketing cards reused in dashboard contexts.
- Card-only page bodies without structural interruption.

---

## 5. Navigation (Desktop + Mobile Unified Logic)

## 5.1 Required Structure
- Global nav with role paths: Broker, Consumer, Platform.
- Mobile nav uses progressive disclosure (max two levels visible at once).
- Current route and parent category must be visibly active.

### 5.2 Rules
- Max 6 top-level desktop items before overflow pattern.
- Mobile drawer must expose primary conversion action in persistent footer.
- SEO taxonomy nav must use canonical icon set (no emoji).

### 5.3 Forbidden Patterns
- Independent nav trees per route group.
- Collapsed mobile menus with hidden conversion path.

---

## 6. Status and Semantic Badges

## 6.1 Allowed Semantics
- success, warning, danger, info, neutral.

### 6.2 Rules
- Badge text must be state-descriptive, not decorative.
- Badge colors must map to semantic tokens.
- Same status meaning must have same color across status page, dashboard, and forms.

### 6.3 Forbidden Patterns
- Custom status colors by feature team.
- Visual-only status without text label.

---

## 7. CTA Bands

## 7.1 Variants
- `conversion`: demo/contact.
- `education`: docs/case study.
- `activation`: onboarding next step.

### 7.2 Rules
- Informational pages require one CTA band before footer.
- CTA band must include: context line, single primary action, optional secondary action.
- CTA band heading max 2 lines on mobile.

### 7.3 Forbidden Patterns
- Footer-only conversion prompts on long content pages.
- More than two CTA buttons in CTA band.

---

## 8. Section Wrappers

## 8.1 Required Wrappers
- `SectionHero`
- `SectionContent`
- `SectionProof`
- `SectionCTA`
- `SectionData`

### 8.2 Rules
- Wrapper controls spacing + max width; sections cannot set bespoke outer spacing.
- Every section defines one dominant intent: educate, prove, compare, convert.

### 8.3 Forbidden Patterns
- Raw `<section>` with custom spacing in page files.
- Same wrapper used for conflicting intent without explicit variant.

---

## 9. Audit Problem Linkage
- **Component duplication** is resolved by canonical component list and import-only policy.
- **CTA hierarchy conflict** is resolved by 3-variant button model and per-surface usage caps.
- **Token drift** is reduced by forbidding custom focus, colors, and card styling.
- **Mobile navigation friction** is resolved through required mobile drawer/footer CTA behavior.
- **Design fragmentation** is prevented by banning route-specific visual forks.

