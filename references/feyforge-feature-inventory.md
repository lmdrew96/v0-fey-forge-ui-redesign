# FeyForge Feature Inventory

**Tech Stack:**
- Framework: Next.js 14+ (App Router)
- UI Components: shadcn/ui + Radix UI
- Styling: Tailwind CSS
- State: Zustand stores
- Language: TypeScript

---

## Page Overview

1. **Dashboard (Home)** - `/`
2. **Characters** - `/characters`
3. **Character Builder** - `/characters/new`
4. **Character Sheet** - `/characters/[id]`
5. **Combat Tracker** - `/combat`
6. **Dice Roller** - `/dice`
7. **DM Assistant** - `/dm-assistant`
8. **NPCs** - `/npcs`
9. **Codex** - `/codex`
10. **Sessions** - `/sessions`
11. **World Map** - `/world-map`
12. **Settings** - `/settings`

---

## 1. Dashboard (Home Page)

**Route:** `/`

**Key Features:**
- Campaign selector widget (switch between campaigns)
- Quick stats display (total characters, sessions, NPCs)
- Recent sessions list (last 5 sessions with dates/notes)
- Quick action buttons (New Character, Roll Dice, Start Session, Add NPC)
- AI Assistant widget (chat interface for DM help)
- Responsive grid layout (2/3 left column, 1/3 right column on desktop)

**Main Components:**
- `CampaignSelector`
- `QuickStats`
- `RecentSessions`
- `QuickActions`
- `AIAssistantWidget`

---

## 2. Characters Page

**Route:** `/characters`

**Key Features:**
- Grid of character cards
- Each card shows: portrait, name, class/level, race, HP status
- Filter by campaign
- Search characters by name
- "Create New Character" button (→ Character Builder)
- Click card to view full character sheet

**Main Components:**
- `CharacterList`
- `CharacterCard`

---

## 3. Character Builder

**Route:** `/characters/new`

**Key Features:**
- Multi-step wizard for character creation
- **Step 1: Basic Info**
  - Name, race/subrace selector
  - Class selector (with tooltips)
  - Background selector
  - Alignment picker
- **Step 2: Ability Scores**
  - Method selector (Point Buy, Standard Array, Manual)
  - Point buy calculator (27 points)
  - Standard array: [15, 14, 13, 12, 10, 8]
  - Display racial bonuses preview
  - Show ability modifiers
- **Step 3: Skills & Proficiencies**
  - Skill selection (based on class + background)
  - Tool proficiencies
  - Languages
  - Display skill check bonuses
- **Step 4: Equipment**
  - Starting equipment packages (class-based)
  - OR take starting gold option
  - Drag-to-equip interface
- **Step 5: Personality**
  - Personality traits (background suggestions)
  - Ideals, Bonds, Flaws
  - Backstory textarea
  - Physical description fields (age, height, weight, appearance)
  - Image upload/URL
- Progress indicator (wizard steps)
- Save draft functionality
- Cancel button (returns to `/characters`)

**Main Components:**
- `CharacterBuilder` (parent wizard)
- `StepBasics`
- `StepAbilityScores`
- `StepSkills`
- `StepEquipment`
- `StepDetails`

**Data Used:** `CharacterCreationData` interface

---

## 4. Character Sheet

**Route:** `/characters/[id]`

**Key Features:**
- **Header:** Portrait, name, class/level, race, background
- **Core Stats Panel:**
  - Ability scores (6 boxes with modifiers)
  - Proficiency bonus
  - Initiative
  - Armor Class
  - Speed
  - Hit Points (current/max/temp)
  - Hit Dice tracker
- **Combat Section:**
  - Attack list (melee/ranged/spells)
  - Damage dice display
  - Attack bonus calculations
- **Skills Panel:**
  - All 18 skills with checkboxes (proficient/expert)
  - Passive Perception highlight
  - Saving throws section
- **Features & Traits:**
  - Racial traits
  - Class features (organized by level)
  - Feats
  - Expandable descriptions
- **Inventory:**
  - Equipment list (equipped/carried)
  - Weight tracking
  - Currency display (CP/SP/EP/GP/PP)
  - Attunement slots
- **Spellcasting Section** (if applicable):
  - Spell slots tracker (by level)
  - Spell save DC & attack bonus
  - Cantrips list
  - Prepared spells
  - Known spells
  - Spell descriptions
- **Notes & Personality:**
  - Personality traits, ideals, bonds, flaws
  - Backstory
  - DM notes
- **Edit Mode Toggle:** Switch to edit character
- **Export Button:** Download as PDF or JSON
- **Delete Character** (confirmation modal)

**Main Components:**
- `CharacterSheet` (parent layout)
- `AbilityScoreBlock`
- `HealthTracker`
- `SkillsList`
- `AttackList`
- `FeaturesPanel`
- `InventoryPanel`
- `SpellcastingPanel`

**Data Used:** Full `Character` interface

---

## 5. Combat Tracker

**Route:** `/combat`

**Key Features:**
- Initiative tracker (sortable list)
- Add combatants (PCs, NPCs, monsters)
- HP tracking per combatant
- Conditions/effects management (poisoned, prone, etc.)
- Round counter
- Turn indicator (highlight active combatant)
- Temporary HP
- Concentration tracking
- Death saves for PCs
- Quick dice roller integration
- Save/load encounters

**Main Components:**
- `CombatTracker`
- `InitiativeList`
- `CombatantCard`
- `ConditionsManager`

---

## 6. Dice Roller

**Route:** `/dice`

**Key Features:**
- Visual dice (d4, d6, d8, d10, d12, d20, d100)
- Click to roll with animation
- Custom dice expressions (e.g., `2d6+3`, `1d20+5`)
- Roll history log
- Advantage/Disadvantage toggles for d20
- Save favorite rolls (e.g., "Fireball: 8d6")
- Roll from character sheet integration

**Main Components:**
- `DiceRoller`
- `DiceVisual`
- `RollHistory`
- `CustomExpression`

---

## 7. DM Assistant

**Route:** `/dm-assistant`

**Key Features:**
- AI chat interface (Claude-powered)
- Context-aware suggestions:
  - Plot hooks
  - NPC dialogue
  - Encounter balancing
  - Rules clarifications
- Reference current campaign/session
- Generate random names (NPCs, places, items)
- Loot generator
- Weather generator
- Random encounter table
- Chat history saved per campaign

**Main Components:**
- `DMAssistant`
- `ChatInterface`
- `GeneratorTools`

---

## 8. NPCs Page

**Route:** `/npcs`

**Key Features:**
- NPC cards grid
- Each card: portrait, name, role, faction, location
- Filter by faction/location/importance
- Search NPCs
- Quick-add NPC form
- Click to view full NPC sheet
- Export NPC list

**NPC Sheet includes:**
- Basic info (name, race, class, role)
- Personality notes
- Goals/motivations
- Relationships (to PCs, other NPCs)
- Stat block (if combatant)
- Quest connections
- Session notes

**Main Components:**
- `NPCList`
- `NPCCard`
- `NPCSheet`

---

## 9. Codex

**Route:** `/codex`

**Key Features:**
- Campaign wiki/encyclopedia
- Tabs: Locations, Factions, Lore, Items, Quests
- **Locations:**
  - Map pins
  - Description
  - Notable NPCs
  - Connected locations
- **Factions:**
  - Name, symbol
  - Goals, leaders
  - Member NPCs
- **Lore:**
  - History entries
  - Legends/myths
  - Timeline
- **Items:**
  - Magic items database
  - Homebrew items
  - Attunement info
- **Quests:**
  - Active/completed quests
  - Objectives checklist
  - Rewards
  - Related NPCs/locations
- Search across all categories
- Link entries together (wiki-style)

**Main Components:**
- `CodexTabs`
- `LocationEntry`
- `FactionEntry`
- `LoreEntry`
- `QuestTracker`

---

## 10. Sessions Page

**Route:** `/sessions`

**Key Features:**
- Session log (chronological)
- Each session entry:
  - Date, session number
  - Title/summary
  - Attendees (which PCs)
  - XP awarded
  - Loot gained
  - Story beats/highlights
  - DM notes
- Create new session
- Edit past sessions
- Export session log as PDF

**Main Components:**
- `SessionList`
- `SessionCard`
- `SessionEditor`

---

## 11. World Map

**Route:** `/world-map`

**Key Features:**
- Interactive map (pan/zoom)
- Add location pins
- Click pin → open location codex entry
- Draw routes/paths
- Fog of war (hide/reveal areas)
- Distance measurement tool
- Upload custom map image

**Main Components:**
- `WorldMap`
- `MapControls`
- `LocationPin`

---

## 12. Settings Page

**Route:** `/settings`

**Key Features:**
- **Theme Settings:**
  - Light/Dark mode toggle
  - Custom theme colors (future)
- **Campaign Management:**
  - Create/edit/delete campaigns
  - Set active campaign
- **Data Management:**
  - Export all data (JSON)
  - Import campaign data
  - Clear all data (with confirmation)
- **Account Settings** (if auth added):
  - Profile info
  - Email notifications
- **About:**
  - Version number
  - Credits
  - GitHub link

**Main Components:**
- `SettingsTabs`
- `ThemeSettings`
- `CampaignSettings`
- `DataManagement`

---

## Core Data Structures

### Character Interface

```typescript
interface Character {
  id: string;
  campaignId?: string;
  
  // Basic Info
  name: string;
  playerName?: string;
  race: string;
  subrace?: string;
  class: string;
  subclass?: string;
  level: number;
  experiencePoints: number;
  background?: string;
  alignment?: Alignment;
  
  // Physical
  age?: string;
  height?: string;
  weight?: string;
  eyes?: string;
  skin?: string;
  hair?: string;
  size?: Size;
  
  // Ability Scores
  baseAbilities: AbilityScores;
  racialBonuses?: Partial<AbilityScores>;
  
  // Combat
  hitPoints: HitPoints;
  hitDice: HitDice[];
  deathSaves: DeathSaves;
  speed: number;
  inspiration: boolean;
  
  // Proficiencies
  savingThrowProficiencies: Ability[];
  skillProficiencies: Skill[];
  skillExpertise: Skill[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  toolProficiencies: string[];
  languages: string[];
  
  // Money
  currency: Currency;
  
  // Spellcasting (if applicable)
  spellcasting?: SpellcastingInfo;
  
  // Properties (features, items, spells, etc.)
  properties: CharacterProperty[];
  
  // Personality
  personalityTraits?: string;
  ideals?: string;
  bonds?: string;
  flaws?: string;
  backstory?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
}
```

### AbilityScores Interface

```typescript
interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}
```

### HitPoints Interface

```typescript
interface HitPoints {
  current: number;
  max: number;
  temp: number;
}
```

### Currency Interface

```typescript
interface Currency {
  cp: number;
  sp: number;
  ep: number;
  gp: number;
  pp: number;
}
```

### SpellcastingInfo Interface

```typescript
interface SpellcastingInfo {
  ability: Ability;
  spellSaveDC: number;
  spellAttackBonus: number;
  spellSlots: Record<number, { total: number; used: number }>;
  cantripsKnown: number;
  spellsKnown?: number;
  spellsPrepared?: number;
}
```

### CharacterProperty Union Type

```typescript
type CharacterProperty = 
  | AttributeProperty 
  | SkillProperty 
  | FeatureProperty 
  | ItemProperty 
  | WeaponProperty
  | ArmorProperty
  | SpellProperty 
  | ActionProperty
  | EffectProperty
  | ClassResourceProperty
  | AlternateFormProperty
  | CompanionProperty;
```

### ItemProperty Interface

```typescript
interface ItemProperty extends BaseProperty {
  type: 'item';
  category: 'weapon' | 'armor' | 'gear' | 'magic' | 'consumable' | 'treasure' | 'tool';
  equipped: boolean;
  attuned?: boolean;
  requiresAttunement?: boolean;
  quantity: number;
  weight: number;
  cost?: {
    amount: number;
    currency: CurrencyType;
  };
  modifiers: Modifier[];
  properties?: string[];
  rarity?: 'common' | 'uncommon' | 'rare' | 'very rare' | 'legendary' | 'artifact';
}
```

### FeatureProperty Interface

```typescript
interface FeatureProperty extends BaseProperty {
  type: 'feature';
  source: 'race' | 'class' | 'background' | 'feat' | 'other';
  sourceClass?: string;
  level?: number;
  uses?: {
    current: number;
    max: number;
    rechargeOn: 'shortRest' | 'longRest' | 'dawn' | 'never';
  };
  grants?: BaseProperty[];
  modifiers?: Modifier[];
}
```

---

## Global Components

### AppShell

**Used on:** All pages

**Props:**
```typescript
interface AppShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}
```

**Features:**
- Sidebar navigation (all pages)
- Theme toggle (top right)
- Campaign indicator (top bar)
- Breadcrumbs
- Page title/subtitle
- Content area wrapper

---

## Navigation Structure

**Sidebar Menu:**
1. 🏠 Dashboard
2. 👤 Characters
3. ⚔️ Combat Tracker
4. 🎲 Dice Roller
5. 🧙 DM Assistant
6. 👥 NPCs
7. 📖 Codex
8. 📝 Sessions
9. 🗺️ World Map
10. ⚙️ Settings

---

## Notes for v0

- All pages use the `AppShell` layout wrapper
- shadcn/ui components are preferred (Button, Card, Input, Select, Tabs, Dialog, etc.)
- Tailwind CSS for styling
- TypeScript interfaces are defined in `/lib/character/types.ts`
- State management uses Zustand stores (`useCharacterStore`, `useCampaignStore`)
- Responsive design (mobile-first approach)
- Dark mode support via next-themes
