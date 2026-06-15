"use client"

// ── Shared display for a saved encounter's run-time flavor ────────────────────
// One place that renders the AI/computed `details` blob captured at save time:
// read-aloud box, DM tactics, scaling, treasure — plus the difficulty badge.
// Used by the Encounters library (/dm/encounters) and the live-session Combat
// tab, so the flavor a DM generated is always recoverable, never lost on save.

import { MarkdownRenderer } from "@/components/ui/markdown-renderer"

export type EncounterDetailsData = {
  readAloud?: string
  setup?: string
  scaling?: string
  treasure?: string
  difficulty?: string
}

// Single source of truth for difficulty → color across every encounter surface.
// Backed by the constant semantic tokens (--sem-*) so danger never re-skins by
// theme or scene. "hard" is a 2014-only intermediate the 3-tier palette doesn't
// cover, so it keeps its own orange.
export function difficultyColor(label?: string): string {
  switch ((label ?? "").toLowerCase()) {
    case "easy":
    case "low":
    case "trivial":
      return "var(--sem-low)"
    case "medium":
    case "moderate":
      return "var(--sem-moderate)"
    case "hard":
      return "#f97316"
    case "deadly":
    case "high":
      return "var(--sem-high)"
    default:
      return "var(--scene-text-muted)"
  }
}

// True when there's at least one block worth showing (so old/bare encounters
// don't get an expander that opens to nothing).
export function hasEncounterDetails(d?: EncounterDetailsData | null): boolean {
  if (!d) return false
  return Boolean(
    d.readAloud?.trim() || d.setup?.trim() || d.scaling?.trim() || d.treasure?.trim(),
  )
}

export function DifficultyBadge({ difficulty }: { difficulty?: string }) {
  if (!difficulty?.trim()) return null
  return (
    <span
      className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
      style={{ background: difficultyColor(difficulty) }}
    >
      {difficulty}
    </span>
  )
}

export function EncounterDetails({ details }: { details?: EncounterDetailsData | null }) {
  if (!hasEncounterDetails(details)) return null
  return (
    <div className="space-y-2">
      <DetailBlock label="Read aloud" body={details!.readAloud} accentBorder />
      <DetailBlock label="DM notes & tactics" body={details!.setup} />
      <DetailBlock label="Scaling" body={details!.scaling} />
      <DetailBlock label="Treasure" body={details!.treasure} accent="var(--scene-accent-3)" />
    </div>
  )
}

// `accent` (a CSS color) tints the left edge + heading — gives the Treasure
// block its tertiary-azure identity. `accentBorder` is the legacy primary edge.
function DetailBlock({ label, body, accentBorder, accent }: { label: string; body?: string; accentBorder?: boolean; accent?: string }) {
  if (!body?.trim()) return null
  const edge = accent ?? (accentBorder ? "var(--scene-accent)" : undefined)
  return (
    <div
      className="rounded-lg px-3 py-2"
      style={{
        background: "var(--scene-bg)",
        borderLeft: edge ? `3px solid ${edge}` : "1px solid var(--scene-border)",
        border: edge ? undefined : "1px solid var(--scene-border)",
      }}
    >
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide" style={{ color: accent ?? "var(--scene-text-muted)" }}>
        {label}
      </p>
      <MarkdownRenderer variant="scene" content={body} className="text-sm" />
    </div>
  )
}
