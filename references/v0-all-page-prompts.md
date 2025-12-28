# FeyForge - v0 Page Prompts

Use these prompts with the project instructions document for consistency.

---

## 1. Dashboard (Home Page)

**Page:** `/` (root)

**Purpose:** Campaign overview with quick access to key features

**Components:**
- Campaign selector dropdown (switch between campaigns)
- Quick stats cards: total characters, sessions played, NPCs created, total party level
- Recent sessions list (last 5) - each showing date, session number, brief summary
- Quick action buttons: "New Character", "Roll Dice", "Start Session", "Add NPC"
- AI Assistant widget: compact chat interface for DM help (expandable)

**Layout:** Responsive grid - stats at top, two-column layout on desktop (2/3 sessions list, 1/3 quick actions + AI widget)

**Note:** Keep it scannable. Most important actions should be immediately visible.

---

## 2. Characters List

**Page:** `/characters`

**Purpose:** Browse all characters in the current campaign

**Components:**
- Filter/search bar at top
- "Create New Character" button (prominent, top-right)
- Grid of character cards (responsive: 1 col mobile, 2 cols tablet, 3-4 cols desktop)
- Each card shows:
  - Portrait/avatar placeholder
  - Character name
  - Class & level (e.g., "Fighter 5")
  - Race
  - HP bar (current/max with visual indicator)
  - Quick view button
- Empty state: "No characters yet. Forge your first hero!"

**Interaction:** Click card → navigate to character sheet

---

## 3. Combat Tracker

**Page:** `/combat`

**Purpose:** Track initiative, HP, and conditions during combat

**Components:**
- **Initiative List:** Sortable cards showing combatants in turn order
  - Each card: name, initiative score, HP tracker (current/max), AC, conditions
  - Highlight active combatant
  - +/- buttons for HP adjustment
  - Temp HP field
  - Condition badges (poisoned, prone, stunned, etc.)
- **Round Counter:** Current round number with +/- controls
- **Add Combatant Button:** Quick-add PCs, NPCs, or monsters
- **Quick Dice Roller:** Integrated d20 roller for attacks/saves
- **Save/Load Encounter:** Save current combat state

**Layout:** Single column on mobile, initiative list fills screen. Add collapsible sections for each combatant's detailed stats.

**Note:** Needs to be fast and touch-friendly for real-time use during games.

---

## 4. NPCs Page

**Page:** `/npcs`

**Purpose:** Manage campaign NPCs

**Components:**
- Search bar and filters (faction, location, importance)
- "Add NPC" button (prominent)
- Grid of NPC cards (similar to characters but simpler)
- Each card shows:
  - Portrait placeholder
  - Name
  - Role/occupation
  - Faction badge
  - Location tag
  - Importance indicator (minor/major/key)
- Click card → expandable detail view (NOT separate page):
  - Personality notes
  - Goals/motivations
  - Relationships
  - Quest connections
  - Optional stat block

**Note:** Keep NPC creation quick - name, role, faction, notes. Everything else optional.

---

## 5. Dice Roller

**Page:** `/dice`

**Purpose:** Interactive dice rolling with 3D animations

**Components:**
- **Visual 3D Dice:** Clickable d4, d6, d8, d10, d12, d20, d100 (use 3D CSS transforms or simple 3D library)
- **Roll Result Display:** Large, clear number with animation
- **Custom Expression Input:** Text field for expressions like "2d6+3", "1d20+5"
- **Advantage/Disadvantage Toggle:** For d20 rolls
- **Roll History Log:** Collapsible list of recent rolls with timestamps
- **Saved Rolls:** Quick-access buttons for common rolls (e.g., "Fireball: 8d6")

**Design:** Make it fun and satisfying! Rolling animation, particle effects on roll, sound effects optional.

**Note:** Should feel tactile and responsive. Big click targets for dice.

---

## 6. Sessions Page

**Page:** `/sessions`

**Purpose:** Campaign session log and notes

**Components:**
- "New Session" button (prominent)
- Chronological list of session cards (newest first)
- Each card shows:
  - Session number & date
  - Title/summary (editable)
  - Attendees (character avatars)
  - XP awarded
  - Key story beats (bullet points, collapsible)
  - DM notes (collapsible, private)
- Click to expand/collapse full session details inline
- Export session log button

**Note:** Optimized for quick note-taking during/after sessions. Support markdown in notes?

---

## 7. Codex (Campaign Wiki)

**Page:** `/codex`

**Purpose:** Campaign encyclopedia powered by Open5e API

**Components:**
- **Tab Navigation:** Spells, Monsters, Magic Items, Equipment, Conditions, Rules
- **Search Bar:** Global search across all content
- **Filters Panel (collapsible):**
  - Content sources: SRD, Homebrew, [other Open5e sources]
  - Category-specific filters (e.g., spell level, creature type, item rarity)
- **Results Grid/List:** Cards showing entry name, type, brief description
- **Detail View:** Click card → expandable detail panel (NOT separate page) showing full Open5e data
- **Bookmarks:** Save frequently referenced entries

**API Note:** Use Open5e REST API (https://api.open5e.com/). Example endpoints:
- Spells: `/spells/`
- Monsters: `/monsters/`
- Magic Items: `/magicitems/`

**Design:** Make it feel like a magical tome. Easy to search and reference mid-game.

---

## 8. World Map

**Page:** `/world-map`

**Purpose:** Interactive campaign world map

**Components:**
- **Map Canvas:** Pan and zoom image viewer
- **Location Pins:** Clickable markers on map
  - Each pin shows location name on hover
  - Click → open location info popover (NOT separate page)
- **Map Controls:**
  - Zoom in/out buttons
  - Reset view button
  - Toggle fog of war (hide/reveal areas)
  - Measurement tool (distance between points)
- **Add Pin Button:** Click map to place new location
- **Upload Map Image:** File upload for custom map

**Library Suggestion:** Use Leaflet.js or similar for pan/zoom functionality, or build simple CSS transform-based zooming.

**Note:** Should work well on touch devices. Pinch to zoom on mobile.

---

## 9. DM Assistant (AI Chat)

**Page:** `/dm-assistant`

**Purpose:** Claude AI-powered DM helper

**Components:**
- **Chat Interface:** 
  - Message list (scrollable)
  - Input field at bottom
  - Send button
- **Message Display:**
  - User messages (right-aligned)
  - AI responses (left-aligned)
  - Timestamps
  - Copy response button
- **Context Indicators:** Show when AI is referencing current campaign/session
- **Quick Prompts:** Suggestion chips for common requests:
  - "Generate NPC name"
  - "Balance encounter for party"
  - "Plot hook idea"
  - "Random loot"
- **Chat History:** Saved per campaign, collapsible sidebar of past conversations

**API:** Will integrate with Anthropic API (already set up in user's codebase)

**Note:** Clean, focused chat UI. No distractions. Like messaging a helpful DM friend.

---

## 10. Settings Page

**Page:** `/settings`

**Purpose:** App and campaign configuration

**Components:**
- **Tab Navigation:** Appearance, Campaign, Data, Account
- **Appearance Tab:**
  - Theme toggle (Light/Dark)
  - Font size selector (optional)
- **Campaign Tab:**
  - List of campaigns with edit/delete buttons
  - "Create New Campaign" button
  - Set active campaign
- **Data Tab:**
  - Export all data (JSON download)
  - Import campaign data (file upload)
  - Clear all data (with scary confirmation)
- **Account Tab:**
  - Display name
  - Email (read-only if logged in)
  - Profile picture upload
  - Change password
  - Delete account (with confirmation)

**Note:** Use clear warnings for destructive actions. Make export/import straightforward.

---

## 11. Account Page

**Page:** `/account`

**Purpose:** User profile and account management

**Components:**
- **Profile Section:**
  - Avatar/profile picture (upload/change)
  - Display name (editable)
  - Email address (display only, link to change in settings)
  - Member since date
- **Active Campaigns:** List of user's campaigns with quick links
- **Stats Overview:**
  - Total characters created
  - Total sessions logged
  - Account level/tier (if applicable)
- **Quick Links:**
  - Go to Settings
  - Sign Out button
- **Danger Zone (collapsible):**
  - Delete account (with multi-step confirmation)

**Note:** Should feel like a personalized dashboard. Welcoming and informative.

---

## 12. Login Page

**Page:** `/login`

**Purpose:** User authentication

**Components:**
- **FeyForge Logo/Title** at top
- **Login Methods:**
  - Email & Password form:
    - Email input (type="email")
    - Password input (type="password", with show/hide toggle)
    - "Forgot password?" link
    - "Login" button
  - OR divider
  - "Continue with Google" button (Google OAuth)
  - OR divider
  - "Send Magic Link" option:
    - Email input
    - "Send Link" button
    - Help text: "We'll email you a link to sign in"
- **No Account?** "Sign up" link at bottom

**Database:** Connects to Neon Postgres (already configured)

**Design:** Clean, centered card layout. Magical but professional. Particles in background.

**Note:** All auth methods should have clear loading states and error handling.

---

## 13. Sign-Up Page

**Page:** `/signup`

**Purpose:** New user registration

**Components:**
- **FeyForge Logo/Title** at top
- **Sign-Up Methods:**
  - Email & Password form:
    - Display name input
    - Email input (type="email")
    - Password input (type="password", with show/hide toggle)
    - Confirm password input
    - Password requirements helper text
    - "Create Account" button
  - OR divider
  - "Continue with Google" button (Google OAuth)
- **Terms & Privacy:** Checkbox "I agree to Terms of Service and Privacy Policy"
- **Already Have Account?** "Login" link at bottom

**Database:** Connects to Neon Postgres (already configured)

**Design:** Similar to login page. Centered card layout with particles background.

**Validation:** Show inline validation errors. Password strength indicator optional but nice.

**Note:** Make sign-up fast and frictionless. Minimal required fields.

---

## General Notes for All Pages

- Include the floating particle animation on every page
- Use the fey wild color palette consistently
- Mobile-first responsive design (phones, tablets, desktops)
- ADHD-friendly layouts (scannable, clear hierarchy, collapsible details)
- No emojis in the UI
- Use shadcn/ui components throughout
- Smooth transitions and interactions
- Clear loading and error states

Remember: Each page should feel like part of a cohesive magical toolkit for DMs and players! ✨
