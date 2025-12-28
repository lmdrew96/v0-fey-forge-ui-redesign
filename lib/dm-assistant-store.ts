import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export interface Conversation {
  id: string
  campaignId: string
  title: string
  messages: Message[]
  createdAt: string
  updatedAt: string
}

interface DMAssistantStore {
  conversations: Conversation[]
  activeConversationId: string | null
  isLoading: boolean
  
  // Conversation management
  createConversation: (campaignId: string, title?: string) => Conversation
  deleteConversation: (id: string) => void
  setActiveConversation: (id: string | null) => void
  updateConversationTitle: (id: string, title: string) => void
  
  // Message management
  addMessage: (conversationId: string, message: Omit<Message, "id" | "timestamp">) => Message
  clearMessages: (conversationId: string) => void
  
  // Getters
  getConversation: (id: string) => Conversation | undefined
  getActiveConversation: () => Conversation | undefined
  getConversationsByCampaign: (campaignId: string) => Conversation[]
  
  // Loading state
  setLoading: (loading: boolean) => void
}

// Generate unique IDs
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

export const useDMAssistantStore = create<DMAssistantStore>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversationId: null,
      isLoading: false,

      createConversation: (campaignId: string, title?: string) => {
        const newConversation: Conversation = {
          id: generateId(),
          campaignId,
          title: title || `New Chat`,
          messages: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          conversations: [newConversation, ...state.conversations],
          activeConversationId: newConversation.id,
        }))
        return newConversation
      },

      deleteConversation: (id: string) =>
        set((state) => ({
          conversations: state.conversations.filter((c) => c.id !== id),
          activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
        })),

      setActiveConversation: (id: string | null) => set({ activeConversationId: id }),

      updateConversationTitle: (id: string, title: string) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, title, updatedAt: new Date().toISOString() } : c
          ),
        })),

      addMessage: (conversationId: string, message: Omit<Message, "id" | "timestamp">) => {
        const newMessage: Message = {
          ...message,
          id: generateId(),
          timestamp: new Date().toISOString(),
        }
        set((state) => ({
          conversations: state.conversations.map((c) => {
            if (c.id === conversationId) {
              // Auto-update title from first user message if still default
              let title = c.title
              if (c.title === "New Chat" && message.role === "user" && c.messages.length === 0) {
                title = message.content.slice(0, 50) + (message.content.length > 50 ? "..." : "")
              }
              return {
                ...c,
                title,
                messages: [...c.messages, newMessage],
                updatedAt: new Date().toISOString(),
              }
            }
            return c
          }),
        }))
        return newMessage
      },

      clearMessages: (conversationId: string) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId
              ? { ...c, messages: [], title: "New Chat", updatedAt: new Date().toISOString() }
              : c
          ),
        })),

      getConversation: (id: string) => get().conversations.find((c) => c.id === id),

      getActiveConversation: () => {
        const state = get()
        return state.conversations.find((c) => c.id === state.activeConversationId)
      },

      getConversationsByCampaign: (campaignId: string) =>
        get().conversations.filter((c) => c.campaignId === campaignId),

      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: "feyforge-dm-assistant",
    }
  )
)

// Simulated AI responses for demo purposes
// This will be replaced with actual Anthropic API integration
export function getSimulatedResponse(input: string): string {
  const lowerInput = input.toLowerCase()

  // Plot hooks
  if (lowerInput.includes("plot hook") || lowerInput.includes("hook") || lowerInput.includes("quest idea")) {
    const hooks = [
      "A local merchant's prized possession—a music box that plays a haunting melody—has started attracting strange, luminescent moths every midnight. The moths seem to form patterns in the air, almost like a map.",
      "The party finds a wanted poster with one of their faces on it, but for a crime they didn't commit... yet. The date on the poster is from three days in the future.",
      "An ancient tree in the town square has begun weeping silver sap, and anyone who touches it experiences vivid visions of a forgotten war between the Feywild and the Material Plane.",
      "A child approaches the party, claiming their imaginary friend has become real and is now holding their family hostage in their own home.",
      "The local thieves' guild is offering a bounty for the safe capture of a bard who can allegedly sing people into their own dreams—and sometimes they don't wake up.",
    ]
    return hooks[Math.floor(Math.random() * hooks.length)]
  }

  // NPC names and concepts
  if (lowerInput.includes("npc") || lowerInput.includes("name") || lowerInput.includes("character")) {
    const npcs = [
      "**Thornwick Bramblefoot** - A nervous halfling herbalist with an encyclopedic knowledge of poisonous plants. He speaks in whispers and always carries a small jar of glowing spores 'for emergencies.'",
      "**Seraphina Duskwalker** - A stoic tiefling blacksmith who only speaks in the hours after sunset. Her forge burns with violet flames, and she claims the metal tells her its true name.",
      "**Bargle Stonewhisper** - A jovial dwarf prospector who claims to hear the voices of gems. He's either a brilliant diviner or completely mad—possibly both.",
      "**Mistral Eventide** - An elven archivist with silver-streaked hair and eyes that seem to reflect starlight. She knows secrets that even the gods have forgotten.",
      "**Grimjaw Ironhide** - A scarred half-orc veteran who runs a soup kitchen in the slums. Former mercenary captain with a price on his head from three different kingdoms.",
    ]
    return npcs[Math.floor(Math.random() * npcs.length)]
  }

  // Tavern descriptions
  if (lowerInput.includes("tavern") || lowerInput.includes("inn") || lowerInput.includes("pub")) {
    const taverns = [
      "**The Gilded Acorn** - A cozy establishment built inside an enormous hollowed oak. Fairy lights dance between the branches above, and the ale is served in acorn-cap tankards. The barkeep, an elderly satyr named Mossworth, tells fortunes in the foam of each drink.",
      "**The Drowned Sailor** - A floating tavern lashed together from shipwrecks, permanently anchored in the harbor. The drinks are cheap, the music is loud, and no questions are asked. A retired kraken tentacle serves as the coat rack.",
      "**The Wanderer's Respite** - This inn exists in multiple locations simultaneously. Step through the right door at midnight, and you might exit in a different city entirely. The owner, a mysterious tiefling named Paradox, refuses to explain how it works.",
    ]
    return taverns[Math.floor(Math.random() * taverns.length)]
  }

  // Encounter ideas
  if (lowerInput.includes("encounter") || lowerInput.includes("combat") || lowerInput.includes("fight")) {
    const encounters = [
      "A group of pixies has stolen something valuable from the party and hidden it somewhere in the nearby forest. They'll only return it if the party can make them laugh—genuine, hearty laughter only.",
      "The road ahead is blocked by two awakened shrubs engaged in a heated philosophical debate about the nature of consciousness. They demand the party settle their argument before allowing passage.",
      "A wounded unicorn stumbles onto the path, pursued by poachers. But something about the unicorn's behavior suggests not all is as it seems—its horn flickers with illusory magic.",
      "The party encounters a traveling merchant whose cart is pulled by a pair of spectral horses. She offers to sell 'memories in bottles'—but whose memories are they, and how did she obtain them?",
      "A circle of standing stones begins to glow as the party approaches. Ghostly warriors emerge, challenging the party to prove their worth through three trials: combat, wit, and compassion.",
    ]
    return encounters[Math.floor(Math.random() * encounters.length)]
  }

  // Random loot
  if (lowerInput.includes("loot") || lowerInput.includes("treasure") || lowerInput.includes("reward")) {
    const loot = [
      "**Moonpetal Pendant** (Uncommon) - A silver pendant containing a preserved flower from the Feywild. Once per long rest, the wearer can cast *Speak with Plants* without expending a spell slot.",
      "**Goblin's Lucky Coin** (Common) - A slightly bent copper coin with a goblin's face on one side. Once per day, you can flip the coin. On heads, gain advantage on your next roll. On tails, disadvantage.",
      "**Inkwell of Endless Stories** (Rare) - A crystal inkwell that never runs dry. Any story written with its ink becomes so compelling that readers must succeed on a DC 13 Wisdom save or be unable to stop reading until finished.",
      "**Boots of the Wandering Path** (Uncommon) - These worn leather boots leave no tracks. Additionally, once per day, the wearer can ask the boots 'which way?' and receive a mental nudge toward the nearest settlement.",
    ]
    return loot[Math.floor(Math.random() * loot.length)]
  }

  // Weather
  if (lowerInput.includes("weather")) {
    const weather = [
      "**Whispering Mist** - A thick, silvery fog rolls in. Within it, faint whispers can be heard—fragments of conversations from the past, or perhaps the future. Visibility is reduced to 30 feet.",
      "**Prismatic Rain** - Multicolored droplets fall from a cloudless sky, leaving temporary rainbow stains on everything they touch. The rain is harmless but mildly magical—detect magic reveals faint enchantment.",
      "**Starfall Night** - Despite it being daytime, the sky darkens and stars become visible. Shooting stars streak overhead constantly. Any wish made during this phenomenon has a 1% chance of coming true in an unexpected way.",
      "**Ember Wind** - A warm wind carries glowing embers from somewhere far away. The air smells of distant fires and ancient magic. Fire spells deal +1 damage during this weather.",
    ]
    return weather[Math.floor(Math.random() * weather.length)]
  }

  // Rules clarification
  if (lowerInput.includes("rule") || lowerInput.includes("how does") || lowerInput.includes("what is")) {
    return "I can help clarify D&D 5e rules. Could you be more specific about which rule or mechanic you'd like me to explain? For example: grappling, opportunity attacks, concentration, advantage/disadvantage, or specific spell interactions."
  }

  // Balance encounter
  if (lowerInput.includes("balance") || lowerInput.includes("difficulty") || lowerInput.includes("cr")) {
    return "To help balance an encounter, I'll need some information:\n\n1. **Party composition** - How many players, what levels?\n2. **Desired difficulty** - Easy, Medium, Hard, or Deadly?\n3. **Environment** - Where does the encounter take place?\n4. **Creature type preference** - Any specific monsters in mind?\n\nShare these details and I'll suggest a balanced encounter!"
  }

  // Default response
  return "I'm your DM Assistant, here to help make your game legendary. I can help with:\n\n• **Plot hooks** - Fresh story ideas\n• **NPC names** - Characters with personality\n• **Tavern descriptions** - Atmospheric locations\n• **Encounter ideas** - Combat and roleplay scenarios\n• **Random loot** - Treasure and magic items\n• **Weather effects** - Environmental storytelling\n• **Rules help** - D&D 5e clarifications\n• **Encounter balancing** - CR calculations\n\nWhat would you like to explore?"
}
