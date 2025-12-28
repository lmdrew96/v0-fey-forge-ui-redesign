# FeyForge - GitHub Copilot Project Instructions

## Core Design Principles

This is a D&D campaign management web app using Next.js 14 (App Router), TypeScript, shadcn/ui components, and Tailwind CSS. The design must be fully responsive for mobile phones (320px+), tablets, and desktops using a mobile-first approach. All interactive elements must work well on touch screens.

The color palette is fey wild nature magic: elven greens, silver, gold, magical cyan, mystic purple, and electric indigo with dual light/dark themes. Every page must include subtle animated floating particles (cyan, purple, indigo) that drift slowly in the background without distracting from content.

**ADHD-Friendly Requirements:** Use clear visual hierarchy, generous whitespace, and group related content in distinct cards. Minimize cognitive load by using progressive disclosure—employ expandable/collapsible sections for detailed information rather than separate detail panels or overwhelming walls of content. Include icons with text labels for dual coding. Keep layouts scannable with clear section headings. Ensure high contrast for interactive elements with obvious hover/focus states. Avoid overwhelming animations.

**Style Notes:** No emojis in the UI. Use expandable accordions or collapsible cards for secondary information. Keep navigation simple and predictable. Use smooth transitions (200-300ms) and maintain consistent spacing throughout.

## Implementation Guidelines

**File Organization:**
- Pages go in `/app/[page-name]/page.tsx`
- Components go in `/components/[feature]/[component-name].tsx`
- Reuse existing components from `/components/ui/` (shadcn/ui)
- Follow existing patterns from completed pages (character builder, character sheet, combat tracker)

**State Management:**
- Use Zustand stores (see `/lib/*-store.ts` for existing patterns)
- Keep state in appropriate stores: `useCharacterStore`, `useCampaignStore`, etc.
- Create new stores as needed following existing patterns

**Data Structures:**
- Reference `/lib/character/types.ts` for Character-related types
- Reference `feyforge-feature-inventory.md` for complete data structures
- Use existing TypeScript interfaces, don't create duplicates

**Component Patterns:**
- Always use shadcn/ui components (Button, Card, Input, Dialog, etc.)
- Import from `@/components/ui/[component]`
- Use the AppShell layout wrapper for all pages: `<AppShell title="Page Title" subtitle="Optional subtitle">`
- Follow the established particle animation pattern from existing pages

**Responsive Design:**
- Mobile-first: Start with mobile layout, then add tablet/desktop breakpoints
- Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- NO horizontal scrolling - ever. Elements must resize/reflow, not overflow
- Test at: 375px (mobile), 768px (tablet), 1024px (desktop), 1440px (large desktop)

**Critical Rules:**
- **DO NOT** create API keys or credentials - user manages environment variables
- **DO NOT** put buttons in headers unless explicitly requested - place in page body
- **NO horizontal scrolling** - elements resize and wrap, never overflow
- **NO emojis** in the UI
- Follow `feyforge-feature-inventory.md` for feature requirements
- Match the design system from completed pages (character builder, character sheet, combat tracker)

**Color Theme:**
When adding new components, use these Tailwind classes:
- Primary (green): `bg-primary`, `text-primary`, `border-primary`
- Accent (cyan): `bg-accent`, `text-accent`, `border-accent`
- Muted: `bg-muted`, `text-muted-foreground`
- Card: `bg-card`, `border-border`
- Use opacity modifiers for subtle effects: `bg-primary/10`, `border-accent/20`

**Particles Animation:**
Every page should include the floating particles background. Reference existing implementation in completed pages.

## Workflow

1. **Understand the feature** - Read the relevant section in `feyforge-feature-inventory.md`
2. **Check existing patterns** - Look at similar completed pages for reference
3. **Plan component structure** - Identify reusable components vs. page-specific ones
4. **Implement mobile-first** - Build mobile layout first, then enhance for larger screens
5. **Test responsiveness** - Verify no horizontal scrolling at all breakpoints
6. **Match design system** - Ensure colors, spacing, and animations match existing pages

## Example Component Structure

```tsx
// app/example-page/page.tsx
import { AppShell } from "@/components/layout/app-shell"
import { ExampleFeature } from "@/components/example/example-feature"

export default function ExamplePage() {
  return (
    <AppShell title="Page Title" subtitle="Optional subtitle">
      <div className="space-y-6">
        <ExampleFeature />
      </div>
    </AppShell>
  )
}
```

```tsx
// components/example/example-feature.tsx
"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ExampleFeature() {
  return (
    <Card className="p-6">
      {/* Content here */}
    </Card>
  )
}
```

## Common Patterns

**Forms:**
- Use shadcn/ui Form components with react-hook-form
- Show validation errors inline
- Include loading states on submit buttons

**Lists/Grids:**
- Use `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for responsive grids
- Add `gap-4` or `gap-6` for spacing
- Use `space-y-4` for vertical lists

**Modals/Dialogs:**
- Use shadcn/ui Dialog component
- Include close button
- Show confirmation for destructive actions

**Loading States:**
- Use shadcn/ui Skeleton component
- Show spinners on buttons during async actions
- Disable interactive elements while loading

## References

- **Feature Requirements:** `feyforge-feature-inventory.md`
- **Page Prompts:** `v0-all-page-prompts.md` (for understanding page purpose/components)
- **Completed Pages:** Character Builder, Character Sheet, Combat Tracker (use as reference)
- **shadcn/ui docs:** https://ui.shadcn.com/
- **TypeScript Types:** `/lib/character/types.ts` and other type files in `/lib/`

Remember: Match the existing design system, keep it ADHD-friendly, ensure mobile responsiveness, and absolutely NO horizontal scrolling!
