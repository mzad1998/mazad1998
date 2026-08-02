# Repository guide

This repository contains only the standalone Arabic customer simulation **مزاد الصيانة**.

## Architecture
- Expo Router routes belong in `app/`; reusable visual primitives in `components/`.
- Domain types live in `types/`, mock generation in `mocks/`, and persistence/business rules in `services/` and `storage/`.
- Keep Arabic UI RTL, use `StyleSheet`, strict TypeScript, manual text entry for customer vehicle/service facts, and local-only AsyncStorage.
- Route components should delegate durable updates to `AppProvider`; never bypass the single-offer acceptance guard.
- Every interactive control must perform an action, navigate to an existing route, or clearly explain why unavailable.

## Checks
Run `npm run typecheck`, `npm run lint`, `npx expo-doctor`, and `npm run export:web` before completion.
