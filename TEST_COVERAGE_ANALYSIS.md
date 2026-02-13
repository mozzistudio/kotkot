# Test Coverage Analysis

## Current State

The project currently has **zero automated tests** and **no testing infrastructure**. There is no test runner (Jest, Vitest, Playwright, etc.), no test configuration, no test directories, and no CI/CD pipeline. All 123 TypeScript/TSX source files lack corresponding test coverage.

The only test-like code in the project consists of two API endpoints (`/api/bot/test` and `/api/insurers/test`) that serve as runtime validation tools in the dashboard — these are not automated tests.

---

## Priority Areas for Test Coverage

The recommendations below are ordered by **risk and business impact** — areas where bugs would cause the most damage.

---

### P0 — Critical (Payment & Webhook Integrity)

#### 1. Payment routing logic (`src/lib/payments.ts`)

- **Why:** Incorrect payment routing means lost revenue or failed transactions. The `createPayment` function has branching logic that selects Yappy (Panama) vs Stripe based on country code and credential presence.
- **What to test:**
  - Panama with valid Yappy credentials routes to Yappy
  - Panama without Yappy credentials falls back to Stripe
  - Non-Panama countries always route to Stripe
  - `unit_amount` calculation (`Math.round(amount * 100)`) handles floating-point edge cases (e.g., `19.99 * 100` should be `1999`, not `1998`)
  - Currency is lowercased for Stripe

#### 2. Stripe webhook handler (`src/app/api/webhooks/stripe/route.ts`)

- **Why:** Webhook signature verification and subscription lifecycle management directly affect billing. A bug in `determinePlan()` or status updates could give users wrong plans or deactivate paying customers.
- **What to test:**
  - Signature verification rejects invalid signatures
  - `checkout.session.completed` activates the correct plan
  - `customer.subscription.updated` updates plan and active status
  - `customer.subscription.deleted` downgrades to starter and deactivates
  - `invoice.payment_failed` logs without deactivating
  - `determinePlan()` maps price IDs correctly, falls back to starter for unknown IDs
  - Non-subscription checkout sessions are ignored

#### 3. Yappy webhook handler (`src/app/api/webhooks/yappy/route.ts`)

- **Why:** Handles payment confirmations for Panama market. A verification bypass or status mapping bug means accepting unverified payments or failing to confirm real ones.
- **What to test:**
  - `verifyYappyWebhook()` rejects payloads missing hash/orderId/status
  - Payment status mapping: `'completed'`, `'success'`, and `'E'` all map to success
  - Failed payments trigger retry link generation
  - Missing payment record returns 404
  - Conversation status transitions to `'closed'` on success

#### 4. Yappy verification (`src/lib/yappy.ts`)

- **Why:** `verifyYappyWebhook()` currently does only a basic presence check (`!!(hash && orderId && status)`). This should be tested to document the current behavior and flag the gap.
- **What to test:**
  - Returns `false` when hash, orderId, or status is missing
  - Returns `true` when all fields present
  - (Future: cryptographic hash verification)

---

### P1 — High (Core Bot Engine & Intent Detection)

#### 5. Intent detection (`src/app/api/bot/process/route.ts` — `detectIntent`)

- **Why:** Drives the entire conversation flow. Incorrect intent classification means the bot asks wrong questions, misses quote opportunities, or fails to hand off to a human.
- **What to test:**
  - Empty history + any message → `'greeting'`
  - Messages starting with "hola", "buenos dias", etc. → `'greeting'`
  - Messages with "cotiz", "seguro", "precio" → `'quote_request'`
  - Messages with "elijo opción 1", "me quedo con" → `'selection'`
  - Messages with "caro", "descuento" → `'objection'`
  - Messages with "agente", "humano" → `'human_transfer'`
  - Messages with "pago", "yappy" → `'payment'`
  - Default fallback → `'data_collection'`

#### 6. Insurance type detection (`src/app/api/bot/process/route.ts` — `detectInsuranceType`)

- **Why:** Tags conversations with the wrong insurance type, affecting analytics and quote routing.
- **What to test:**
  - "auto", "carro", "vehiculo" → `'auto'`
  - "salud", "medico" → `'health'`
  - "hogar", "casa" → `'home'`
  - "viaje", "travel" → `'travel'`
  - "negocio", "empresa" → `'business'`
  - Unrelated messages → `null`

#### 7. Bot fallback response generator (`src/lib/claude.ts` — `generateFallbackResponse`)

- **Why:** Used when no API key is configured (demo mode, testing, development). The function has complex branching on personality settings (tone, formality, pronoun, emoji level) and message content.
- **What to test:**
  - Greeting patterns produce correct responses for each tone (warm, direct, expert, default)
  - Insurance type keywords (auto, salud, hogar, viaje, negocio) produce category-specific responses
  - Formal vs informal pronoun usage (`usted` vs `tu`)
  - Emoji levels: frequent adds emojis, minimal adds few, none adds none
  - Fallback/catch-all response when no keywords match

#### 8. WhatsApp message extraction (`src/app/api/webhooks/whatsapp/route.ts` — `extractMessageText`)

- **Why:** If this fails, incoming WhatsApp messages are silently dropped.
- **What to test:**
  - Text messages extract `text.body`
  - Interactive button replies extract `button_reply.title`
  - Interactive list replies extract `list_reply.title`
  - Unsupported types (image, voice, location) return `null`

---

### P2 — Medium (Utilities, Data, & API Validation)

#### 9. Utility functions (`src/lib/utils.ts`)

- **Why:** Used across the entire app. `formatCurrency`, `generateOrderId`, and `timeAgo` have edge cases.
- **What to test:**
  - `cn()` — filters falsy values, joins with space
  - `formatCurrency(19.99, 'USD', '$')` → correct formatted string
  - `formatCurrency(0)` — zero amount
  - `formatPhone('+50761234567')` — already has prefix
  - `formatPhone('50761234567')` — adds prefix
  - `generateOrderId()` — matches `CF-{timestamp}-{random}` pattern
  - `timeAgo` — just now, minutes, hours, days, months

#### 10. Country utilities (`src/lib/countries.ts`)

- **Why:** Payment method selection depends on `getPaymentMethod()` returning the right provider.
- **What to test:**
  - `getCountry('PA')` returns Panama data
  - `getCountry('XX')` returns `undefined`
  - `getPaymentMethod('PA')` → `'yappy'`
  - `getPaymentMethod('CO')` → `'stripe'`
  - `getCurrencySymbol('PE')` → `'S/'`
  - `getCurrencySymbol('XX')` → `'$'` (fallback)

#### 11. Insurer adapter pattern (`src/lib/insurers/`)

- **Why:** The adapter registry and fallback to `ManualRatesAdapter` for unknown types is a critical code path in quote generation.
- **What to test:**
  - `AssaAdapter` — `testConnection()` handles network errors gracefully (returns `false`)
  - `ManualRatesAdapter` — `testConnection()` always returns `true`
  - `ManualRatesAdapter` — `getQuote()` returns `isRealtime: false`
  - Adapter registry in `/api/insurers/quote` — known slug returns correct adapter, unknown slug falls back to ManualRatesAdapter

#### 12. API route input validation

- **Why:** All API routes do manual validation. Missing or malformed input should return consistent 400 errors.
- **What to test (for each API route):**
  - `/api/bot/process` — missing `conversationId` or `message` → 400
  - `/api/insurers/quote` — missing required fields → 400, invalid `insuranceType` → 400
  - `/api/payments/create` — missing `quoteResultId` → 400
  - All authenticated routes — no auth → 401

#### 13. SEO metadata generators (`src/lib/seo/metadata.ts`)

- **Why:** Incorrect metadata affects search rankings. The functions are pure and easily testable.
- **What to test:**
  - `generateSEOMetadata()` produces correct OpenGraph, Twitter Card, robots config
  - `noindex: true` sets `robots.index: false`
  - Product/company/cross-page metadata generators produce correct titles and canonical URLs
  - Keywords are generated correctly

#### 14. Schema.org generators (`src/lib/seo/schema.ts`)

- **Why:** Structured data validation. Invalid schema markup can cause Google Search Console errors.
- **What to test:**
  - Each generator produces valid `@context` and `@type`
  - `generateBreadcrumbSchema()` positions items starting at 1
  - `generateFAQSchema()` produces correct Question/Answer pairs
  - `generateInsuranceCompanySchema()` includes aggregateRating

#### 15. Data loaders and caching (`src/data/index.ts`)

- **Why:** The in-memory cache and file loading are used for all SEO pages. Broken data loading means blank pages.
- **What to test:**
  - `getFromCache()` returns cached value on second call
  - `loadJSON()` returns `null` for missing files (doesn't crash)
  - `clearCache()` empties the cache
  - `getAllInsuranceProducts()` returns 10 products
  - `getInsuranceCompaniesByCountry('panama')` returns 10 companies
  - `getInsuranceProduct('auto')` returns the auto product
  - `generateInsuranceCrossPages()` only includes valid product×company combos

---

### P3 — Lower Priority (UI, E2E, Integration)

#### 16. WhatsApp webhook verification (GET handler)

- **Why:** Meta's webhook verification handshake must work or the bot won't receive messages.
- **What to test:**
  - Correct mode + token returns the challenge
  - Wrong token returns 403
  - Missing parameters return 403

#### 17. Middleware auth protection

- **Why:** Dashboard routes must require authentication. The middleware matcher list must cover all protected routes.
- **What to test:**
  - Protected paths (dashboard, conversations, quotes, etc.) invoke `updateSession`
  - Non-protected paths (marketing pages, webhooks) are not matched

#### 18. React component smoke tests (future)

- **Why:** Catch rendering crashes and prop type issues.
- **Suggested scope:**
  - UI primitives: `Button`, `Badge`, `Input`, `Modal`, `Toggle` render without crashing
  - Dashboard: `Sidebar`, `StatsCard`, `TopBar` render with mock data
  - Marketing: `Pricing`, `Features`, `Hero` render correctly

#### 19. E2E flows (future, with Playwright)

- **Why:** Validate full user journeys.
- **Suggested scope:**
  - Signup → dashboard → configure bot → test conversation
  - Quote generation → payment link creation
  - WhatsApp webhook → bot response → message saved in DB

---

## Recommended Testing Setup

### Test Runner: Vitest

Vitest is the recommended choice for this Next.js project because:
- Native TypeScript and ESM support (no extra config)
- Compatible with Next.js path aliases (`@/`)
- Fast execution with watch mode
- Jest-compatible API (easy migration if needed later)

### Suggested `package.json` additions

```json
{
  "devDependencies": {
    "vitest": "^3.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "jsdom": "^25.0.0"
  },
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Suggested directory structure

```
src/
├── lib/
│   ├── __tests__/
│   │   ├── utils.test.ts
│   │   ├── countries.test.ts
│   │   ├── payments.test.ts
│   │   ├── claude.test.ts
│   │   ├── whatsapp.test.ts
│   │   └── yappy.test.ts
│   ├── insurers/
│   │   └── __tests__/
│   │       ├── assa.test.ts
│   │       └── manual-rates.test.ts
│   └── seo/
│       └── __tests__/
│           ├── metadata.test.ts
│           └── schema.test.ts
├── app/
│   └── api/
│       ├── bot/process/__tests__/
│       │   └── route.test.ts
│       ├── webhooks/stripe/__tests__/
│       │   └── route.test.ts
│       └── webhooks/yappy/__tests__/
│           └── route.test.ts
└── data/
    └── __tests__/
        └── index.test.ts
```

---

## Implementation Order

| Phase | Scope | Files | Estimated Tests |
|-------|-------|-------|----------------|
| 1 | Pure utility functions | `utils.ts`, `countries.ts` | ~25 |
| 2 | Intent detection & message extraction | `bot/process/route.ts` helpers, `whatsapp/route.ts` helpers | ~30 |
| 3 | Payment logic | `payments.ts`, `yappy.ts`, `stripe.ts` | ~20 |
| 4 | Webhook handlers (mocked Supabase/Stripe) | `webhooks/stripe`, `webhooks/yappy` | ~25 |
| 5 | Bot fallback responses | `claude.ts` | ~20 |
| 6 | Insurer adapters | `adapter.ts`, `assa.ts`, `manual-rates.ts` | ~10 |
| 7 | SEO utilities | `metadata.ts`, `schema.ts` | ~20 |
| 8 | Data loaders & caching | `data/index.ts` | ~15 |
| 9 | API route validation (auth, input) | All API routes | ~20 |
| 10 | Component smoke tests | UI primitives, dashboard, marketing | ~15 |

**Total: ~200 tests across 10 phases**

---

## Key Risks Without Tests

1. **Payment bugs go undetected** — Floating-point arithmetic in `Math.round(amount * 100)` could silently produce wrong charge amounts.
2. **Webhook signature bypass** — No tests verify that invalid Stripe signatures are rejected, or that Yappy's basic verification is enforced.
3. **Bot intent misclassification** — Regex-based intent detection has no regression safety net. Changing one pattern could break others.
4. **Silent message drops** — `extractMessageText()` returning `null` for valid messages would cause messages to vanish without any error.
5. **Plan downgrade/upgrade bugs** — `determinePlan()` depends on environment variables for price IDs. Misconfiguration would silently assign wrong plans.
6. **Country-payment misrouting** — A typo in country code logic could send Panamanian payments to Stripe or route other countries to Yappy.

---

## Refactoring Suggestions to Improve Testability

Several helper functions are currently defined as private functions inside API route files, making them impossible to test in isolation:

1. **Extract `detectIntent()` and `detectInsuranceType()`** from `src/app/api/bot/process/route.ts` into `src/lib/bot/intent.ts`
2. **Extract `extractMessageText()` and `findOrCreateConversation()`** from `src/app/api/webhooks/whatsapp/route.ts` into `src/lib/whatsapp.ts`
3. **Extract `determinePlan()`** from `src/app/api/webhooks/stripe/route.ts` into `src/lib/stripe.ts`
4. **Extract `loadBotPersonality()`** (duplicated in two files) into a shared `src/lib/bot/personality.ts`

These extractions would make unit testing straightforward without needing to mock HTTP request/response objects.
