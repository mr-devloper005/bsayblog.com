# Slot 4 Editable Manifest

This folder is the only safe UI customization surface for Slot 4 sites.

## Allowed To Edit

- `src/editable/pages/**`
- `src/editable/content/**`
- `src/editable/theme/**`
- `src/editable/components/**`

## Do Not Edit

- `src/app/**` except route files intentionally importing editable pages
- `src/lib/**`
- `src/config/**`
- `src/components/**` outside `src/editable/components/**`
- `src/design/**`
- `src/app/api/**`
- `.github/**`
- `Dockerfile`
- `docker-compose*.yml`
- `package.json`
- lockfiles

## AI Redesign Workflow

Give AI only this folder unless a build error requires more context.
Ask for complete drop-in files only.
Keep all exported component names and props compatible.
Do not remove post loops, links, contact form, metadata exports, or task detail behavior.

## Recommended AI Upload Set

For a full redesign:

- `src/editable/pages/**`
- `src/editable/content/pages.content.ts`
- `src/editable/content/global.content.ts
- `src/editable/content/tasks.config.ts``
- `src/editable/content/tasks.config.ts`
- `src/editable/theme/brand.config.ts`
- `src/editable/theme/visual-system.ts`
- `src/editable/components/LoadingStates.tsx`
- `src/editable/components/EmptyStates.tsx`

## Required Checks

Run before PR:

```bash
pnpm guard:editable
pnpm build
```

## AI-Safe Layout V2

For full visual redesigns, edit these files first:

- `src/editable/sections/HomeSections.tsx`
- `src/editable/sections/ArticleSections.tsx`
- `src/editable/cards/PostCards.tsx`
- `src/editable/layouts/design-contract.ts`
- `src/editable/theme/brand.config.ts`
- `src/editable/theme/visual-system.ts`
- `src/editable/content/pages.content.ts`
- `src/editable/content/task-pages.content.ts`

Rules for AI edits:

- Keep page files as data/composition shells.
- Do not remove required exports from page files.
- Do not replace dynamic `posts` props with static arrays.
- Do not make cards narrower than `min-w-[280px]`.
- Prefer editing sections/cards instead of touching fetch logic.

- `src/editable/theme/editable-global.css` - full-site background, selection, scrollbar, and article-global visual CSS.
