# UX Principles (Conversion and Product Behavior)

These principles define enforceable UX behavior for Kotkot's multi-surface experience.

## 1. Funnel-Based CTA Logic

## 1.1 Audience Tracks
- **B2B broker/agency track**: evaluate platform, request demo, activate account.
- **Consumer track**: understand options, compare, request quote/contact.

### 1.2 CTA Priority by Funnel Stage
- Awareness: tertiary education CTA.
- Evaluation: secondary exploration/comparison CTA.
- Decision: primary conversion CTA.
- Activation: primary task CTA inside dashboard.

Rules:
- Every page declares its funnel stage in metadata.
- CTA styling must match declared stage.
- Conflicting intent CTAs at equal prominence are forbidden.

---

## 2. Conversion Clarity Framework
Each conversion surface must answer, above the fold:
1. What this solves.
2. Who it is for.
3. What happens after clicking CTA.

Required artifacts near major conversion actions:
- latency/response expectation,
- trust signal (compliance/security/social proof),
- fallback contact path.

---

## 3. Readability Standards
- Body text min size: 14.
- Primary text contrast must meet WCAG AA (4.5:1).
- Long-form content requires paragraph spacing on approved scale.
- Mixed language microcopy in the same task flow is forbidden unless locale strategy requires it.

---

## 4. Scannability Rules
- Every long page must provide at least two scan aids:
  - TOC/anchor links,
  - comparison table,
  - checklist,
  - summary callout,
  - collapsible FAQ.
- Dense technical/support pages require visible “next action” module before footer.
- Repeated card stacks without structural variation are forbidden.

---

## 5. Accessibility Requirements
Mandatory for all interactive UI:
- Keyboard navigable order with visible focus.
- Semantic headings and landmarks.
- Form fields with explicit labels and error associations.
- Color is never the sole carrier of status.
- Touch targets >= 44px for primary mobile interactions.

CI acceptance should include automated accessibility checks on representative templates.

---

## 6. Dashboard Activation Logic
New account experience must include:
1. Activation checklist (connect channel, configure bot, generate first quote).
2. Contextual empty states with single next action.
3. Progress feedback after each milestone.

Rules:
- Every dashboard module with empty state must include one action and one explanation.
- Activation CTAs outrank upsell CTAs until first value event is completed.

---

## 7. Trust Reinforcement Rules
Trust content is mandatory at decision points:
- auth submit,
- demo/contact forms,
- pricing/commitment sections,
- API integration entry points.

Approved trust evidence:
- compliance statement,
- uptime/SLA status,
- customer proof,
- data handling statement.

Vague trust claims without evidence are forbidden.

---

## 8. Mobile-First Behavioral Logic
- Design starts from 360–390px widths.
- Critical actions must remain reachable within thumb zone in key flows.
- Long data/comparison modules default to collapsed progressive disclosure.
- Mobile nav must preserve clear path to primary conversion action.

Any desktop pattern that cannot be reduced to a readable mobile behavior is non-compliant.

---

## 9. Audit Problem Linkage
- **Funnel ambiguity** is resolved by stage-based CTA mapping and metadata declaration.
- **Conversion clarity gaps** are resolved by above-the-fold decision requirements.
- **Readability/scannability issues** are resolved by measurable text and scan-aid constraints.
- **Trust gaps** are resolved by mandatory evidence near high-risk decisions.
- **Dashboard activation friction** is resolved by checklist-first onboarding logic.
- **Mobile behavioral inconsistency** is resolved by thumb-zone and progressive disclosure rules.

