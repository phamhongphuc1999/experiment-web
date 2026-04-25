# Next.js Framework Compliance

This project runs on **Next.js 16.2.x** with the **App Router** and stores routes under `src/app/`.
All framework-specific code must follow the current Next.js 16 behavior for layouts, metadata, route handlers, and server/client boundaries. Do not introduce Pages Router patterns or outdated conventions from older Next.js versions.

# Project Scope

This repository is an **experimental web playground** that currently contains several independent modules:

- board games such as **Caro**, **Connect4**, and **Pikachu**
- a **process/state-machine simulator**
- a **PApp** flow with auth, conversation, and user APIs
- **web3 wallet** integration and balance/contract utilities
- small utility pages such as **encrypt**

When adding or changing features, preserve that modular structure. Avoid forcing unrelated domains into a single shared abstraction.

# Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Language:** TypeScript with `strict: true`
- **Styling:** Tailwind CSS v4
- **State:** Zustand, React Context, XState
- **Data Fetching:** TanStack Query, Axios
- **Testing:** Vitest, Testing Library

# Architecture Rules

### 1. Routing and View Composition

- Keep route files in `src/app/` thin.
- Route files should primarily compose metadata, guards, providers, and page-level views.
- Put page UI in `src/views/`.
- Prefer route groups such as `src/app/(dashboard)/...` and `src/app/papp/...` for domain separation.

### 2. Domain Placement

- Put reusable UI in `src/components/`.
- Put page-level compositions in `src/views/`.
- Put stateful client logic shared across features in `src/hooks/`, `src/context/`, or `src/states/` depending on the existing pattern in that area.
- Put pure business logic and transformations in `src/services/`, `src/structure/`, and `src/state-machine/`.
- Put API wrappers in `src/api/` and query-layer orchestration in `src/queries/`.
- Put web3-specific code under `src/web3/`.

### 3. Keep Logic Out of Render Paths

- Board rules, state-machine transitions, queue logic, encryption helpers, and data transforms should stay outside React components whenever possible.
- Components should orchestrate and render; calculation-heavy logic belongs in service/state-machine/structure modules.
- If logic must be shared between UI and tests, prefer extracting it into a pure TypeScript module.

# TypeScript Conventions

### 1. Shared Types

- Shared types must live in `src/types/` or in a clearly scoped domain type file such as `src/web3/types.ts` when already established by the module.
- Reuse existing shared types before creating new ones.
- When adding new shared type files, prefer naming by domain, for example `src/types/process.type.ts`.

### 2. Naming

- For new code, prefer the existing project convention where shared types and interfaces use a `T` prefix, for example `TProcessItem` or `TConversation`.
- Local component props should be declared as `TProps`.
- Do not rename existing stable types purely for style consistency unless the task requires touching that area broadly.

# Component Standards

- Keep components focused on one responsibility.
- Prefer one primary exported component per `.tsx` file.
- If a component grows too large or mixes layout with business logic, split subparts into nearby components or hooks.
- Follow the existing import alias convention such as `src/...` instead of deep relative paths.
- Respect explicit client boundaries. Add `'use client'` only where browser APIs, hooks, or interactive behavior require it.

# Styling Standards

- Use Tailwind utilities first.
- Prefer standard spacing, sizing, color, and typography scales over arbitrary values.
- Use arbitrary values only when the design genuinely requires them.
- Reuse existing UI primitives in `src/components/shadcn/` and shared layout components before introducing new variants.

# State and Data Rules

- Match the local architecture of the feature you are editing.
- In areas already using Zustand, extend the store instead of introducing a second state pattern without a clear reason.
- In areas already using XState, keep transition logic in the state-machine layer rather than moving it into components.
- For remote data, prefer the existing `src/api/` plus `src/queries/` flow instead of fetching directly inside views.

# Testing and Validation

- Add or update Vitest coverage when changing behavior in pure logic modules such as `src/services/`, `src/structure/`, or `src/state-machine/`.
- Prefer Testing Library for component behavior that matters to users.
- Before finishing a task, run the narrowest relevant check first:
  - `npm run test -- <pattern>` when a focused test exists
  - `npm run eslint`
  - `npm run build` for broad integration confidence when needed

# Existing Structure Reference

1. `src/app/`: App Router entries, layouts, and route handlers
2. `src/views/`: page-level compositions
3. `src/components/`: reusable UI building blocks
4. `src/services/`: pure helpers and domain logic
5. `src/state-machine/`: XState machines and process helpers
6. `src/states/` and `src/context/`: client state containers and providers
7. `src/api/` and `src/queries/`: HTTP and query orchestration
8. `src/types/`: shared app/domain types
9. `src/web3/`: wallet, chain, balance, and contract integrations
10. `src/__tests__/`: Vitest coverage

# Change Discipline

- Prefer minimal, local changes that fit the current module.
- Do not rewrite one feature to a new architectural style unless the task explicitly calls for refactoring.
- Preserve backward-compatible behavior for existing routes and game flows unless the requested change is intentionally behavioral.
- If a new abstraction only serves one screen, keep it local until reuse is real.
