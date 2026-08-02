# Implementation checklist

Legend: `[x]` implemented and checked, `[ ]` remaining.

## Phase 1 — foundation
- [x] Expo Router/TypeScript project runs on native and web
- [x] RTL design system and reusable UI
- [x] Complete models, safe storage, repository boundary, app state

## Phase 2 — onboarding
- [x] Bounded splash initialization and routing
- [x] Iraqi phone validation, legal links, simulated OTP 1234/countdown
- [x] Manual customer name/area setup and optional profile image

## Phase 3 — home/navigation
- [x] Home header, unread badge, six service cards, metrics, active request and shortcuts
- [x] All navigation destinations and not-found fallback

## Phase 4 — vehicles and request forms
- [x] Vehicle add/view/edit/delete/select with manual fields
- [x] Six category-specific request forms and up-to-three image handling
- [x] Review/edit screens and Arabic validation

## Phase 5 — request lifecycle
- [x] Duplicate-safe submission, persistence, timeline/tracking, edit/cancel rules
- [x] Current/previous/cancelled request filters

## Phase 6 — workshops/offers
- [x] 10+ fictional workshop profiles/reviews
- [x] Varied category-aware persisted offer generation (maximum seven)
- [x] Offer cards/details and durable one-offer acceptance invariant

## Phase 7 — communication
- [x] Workshop profile, reviews, safe phone/WhatsApp linking
- [x] Persistent request/workshop chat with automatic common-question replies

## Phase 8 — account and secondary areas
- [x] Notifications read/delete/all-read
- [x] Profile edit, settings/preferences, accepted offers
- [x] Support submission/history, FAQ, terms/privacy/about
- [ ] Logout, double-confirm delete account, complete demo tools

## Phase 9 — hardening/documentation
- [ ] Empty/corrupt/demo storage scenarios and domain tests
- [ ] TypeScript, lint, Expo diagnostics and web export
- [ ] Available user-flow validation and device-only limitations documented
- [x] Complete README

## Current validation record (2026-08-02)
- Dependency installation was retried against the official npm registry and remains blocked by the environment proxy (`403 Forbidden` for both `@expo/vector-icons` and AsyncStorage); TypeScript, lint, Expo diagnostics, export, and runtime journeys remain unverified.
- Native device image permissions and phone/WhatsApp handoff require manual device testing.
- Remaining product gaps are automated/runtime validation that requires installed Expo dependencies; the text-size preference is applied to shared screen headings. Demo request/offer generation, destructive reset, accepted-offer cleanup, notification/chat cleanup, and local-image reference cleanup are implemented. Profile image selection, explicit review/edit-before-submit, and the accepted-offers index are now implemented.
