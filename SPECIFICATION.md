# مزاد الصيانة — product specification

## Scope and identity
A fresh, standalone, Arabic-only RTL customer application for simulation/testing. Customers manually describe automotive needs, receive offers from fictional Iraqi workshops, compare them, chat, and accept exactly one offer per request. It is not a workshop/provider/admin app and shares no code, branding, assets, layouts, or copy with AutoJerry or another product.

## Platform and boundaries
React Native, Expo, Expo Router, strict TypeScript, StyleSheet and AsyncStorage; Expo Go on iOS/Android and reasonable web compatibility. There is no backend, real SMS (OTP is `1234`), real workshop transaction, payment, external database, remote image, secret, or paid API. All customer and simulation data stays locally.

## UX rules
- Original bright Iraqi automotive identity, safe-area/keyboard aware, responsive, readable, lightweight, with clear loading/empty/error/success states.
- Correct RTL alignment throughout. Arabic is the only language.
- Vehicle manufacturer/model/year/fuel/engine, area, battery/tire/glass/accessory/part information are manual text inputs—not pickers or predefined databases.
- Forms trim and validate required values, prevent duplicate submission, and confirm destructive actions.
- Images are optional (maximum three where requested), removable, permission-aware and degrade safely on web.

## Domain and persistence
Stable IDs and ISO dates are used for customers, vehicles, service requests/images/timeline, workshops/reviews/offers/accepted offers, conversations/messages, notifications, support tickets and settings. Centralized persistence safely parses missing/invalid data and initialization always exits through `finally`. Repository contracts permit a future remote implementation.

## Core rules
Requests cover maintenance, parts, accessories, batteries, tires, and glass. Submitted requests persist, receive varied simulated offers from at least ten fictional workshops, a notification, and tracking timeline. A transaction-style state operation allows only one accepted offer per request across restarts. Before acceptance a request can be edited/cancelled; afterward it is locked. Associations among request, vehicle, offer, workshop, and chat are validated.

## Product areas
Splash/auth/setup; home; vehicles; category request/review; tracking/history; offers/details; fictional workshop profiles/reviews; safe phone/WhatsApp links; persistent simulated chat/replies; notifications; profile/preferences; support/tickets; FAQ; terms/privacy/about; logout; double-confirm account deletion; and confirmed demo/reset tools. A safe not-found route is required.
