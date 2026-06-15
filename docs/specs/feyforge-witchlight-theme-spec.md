# FeyForge base theme — "Witchlight" *(working name — rename at will)*

Replaces the single-accent iris scene system with a **3-accent polychrome model**.
Locked from live testing in the polychrome theme rig.

**Primary** `#2DE193` (spring-green) · **Secondary** `#E12DD5` (witchlight magenta) · **Tertiary** `#19A1E1` (azure)

---

## Scene tokens (both modes)

| Role | Token | Dark | Light |
|---|---|---|---|
| Background | `--scene-bg` | `#131615` | `#F6F8F7` |
| Surface | `--scene-surface` | `#1D2220` | `#FFFFFF` |
| Border | `--scene-border` | `#333D39` | `#E4ECE9` |
| Text primary | `--scene-text-primary` | `#ECEEED` | `#1D2622` |
| Text muted | `--scene-text-muted` | `#91A19A` | `#60766D` |
| Accent · primary | `--scene-accent` | `#2DE193` | `#2DE193` |
| Accent 2 · secondary | `--scene-accent-2` | `#E12DD5` | `#E12DD5` |
| Accent 3 · tertiary | `--scene-accent-3` | `#19A1E1` | `#19A1E1` |
| Highlight | `--scene-highlight` | `#7DECBC` | `#44E49F` |

### Derived

| Token | Dark | Light |
|---|---|---|
| `--scene-accent-text` | `#0D0D10` | `#0D0D10` |
| `--scene-accent-2-text` | `#0D0D10` | `#0D0D10` |
| `--scene-accent-3-text` | `#0D0D10` | `#0D0D10` |
| `--scene-accent-glow` | `rgba(45, 225, 147, 0.22)` | `rgba(45, 225, 147, 0.14)` |
| `--scene-accent-2-glow` | `rgba(225, 45, 213, 0.18)` | `rgba(225, 45, 213, 0.12)` |
| `--scene-particle` | `#E12DD5` (= accent-2) | `#E12DD5` |
| `--scene-shadow` | `rgba(0, 0, 0, 0.5)` | `rgba(0, 0, 0, 0.12)` |

> Button/fill text colors are pre-solved for contrast. All three accents land on **black** labels except where a glow/tint background is used (then the accent itself is the text — see role map).

---

## Role map — where each hue goes

| Hue | Drives |
|---|---|
| **Primary** `--scene-accent` | filled buttons (Generate hoard, Save), ruleset toggle active, logo gradient start |
| **Secondary** `--scene-accent-2` | active nav item, section icons, links, search focus ring, logo gradient end, ambient particles |
| **Tertiary** `--scene-accent-3` | treasure block (heading + active tier pill) |

---

## Semantic layer — **DO NOT theme** (constant both modes)

Difficulty status must never re-skin — a player should never relearn a color's meaning.

| Token | Value |
|---|---|
| `--sem-low` | `#16A34A` (green) |
| `--sem-moderate` | `#D97706` (amber) |
| `--sem-high` | `#DC2626` (red) |

Mode-specific text/bg/border for the callout + budget bars are the only thing that flexes (lightness for legibility), never the hue.

---

## For Cody — implementation checklist

1. **Grow the token set.** The old table had one `--scene-accent`. Add `--scene-accent-2`, `--scene-accent-3`, their `-text` variants, and `--scene-accent-2-glow` — defined in **both** the dark and light theme blocks (`[data-theme="dark"]` / `[data-theme="light"]`, wherever the scene vars live today).
2. **Wire the role map** above. The monotone was structural: every accented element pointed at the single accent. Repoint nav/icons/links → `accent-2`, treasure → `accent-3`.
3. **Keep semantics separate.** Difficulty Low/Mod/High stays on its own `--sem-*` tokens, unchanged across themes.
4. **Both modes, every token.** Don't leave light mode half-wired.
5. Mind the repo's dense single-line JSX style — **no `prettier --write` on touched files**.
6. Bump version per semver (this is a visible base-theme change, not a patch-level tweak).
