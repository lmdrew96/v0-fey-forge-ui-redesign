import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface NPC {
  id: string
  campaignId: string
  name: string
  role: string
  faction?: string
  location?: string
  importance: "minor" | "major" | "key"
  race?: string
  class?: string
  personality: string
  goals?: string
  relationships?: string
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

interface NPCsStore {
  npcs: NPC[]
  addNPC: (npc: NPC) => void
  updateNPC: (id: string, data: Partial<NPC>) => void
  deleteNPC: (id: string) => void
  getNPC: (id: string) => NPC | undefined
  getNPCsByCampaign: (campaignId: string) => NPC[]
  getNPCCount: (campaignId: string) => number
}

export const useNPCsStore = create<NPCsStore>()(
  persist(
    (set, get) => ({
      // Start with empty array - sample data removed for production
      npcs: [],
      addNPC: (npc) =>
        set((state) => ({
          npcs: [...state.npcs, npc],
        })),
      updateNPC: (id, data) =>
        set((state) => ({
          npcs: state.npcs.map((n) =>
            n.id === id
              ? { ...n, ...data, updatedAt: new Date().toISOString() }
              : n
          ),
        })),
      deleteNPC: (id) =>
        set((state) => ({
          npcs: state.npcs.filter((n) => n.id !== id),
        })),
      getNPC: (id) => get().npcs.find((n) => n.id === id),
      getNPCsByCampaign: (campaignId) =>
        get().npcs.filter((n) => n.campaignId === campaignId),
      getNPCCount: (campaignId) =>
        get().npcs.filter((n) => n.campaignId === campaignId).length,
    }),
    {
      name: "feyforge-npcs",
    }
  )
)
