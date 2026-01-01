import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Campaign {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

interface CampaignsStore {
  campaigns: Campaign[]
  activeCampaignId: string | null
  addCampaign: (campaign: Campaign) => void
  updateCampaign: (id: string, data: Partial<Campaign>) => void
  deleteCampaign: (id: string) => void
  setActiveCampaign: (id: string | null) => void
  getCampaign: (id: string) => Campaign | undefined
  getActiveCampaign: () => Campaign | undefined
}

export const useCampaignsStore = create<CampaignsStore>()(
  persist(
    (set, get) => ({
      // Start with empty array - sample data removed for production
      campaigns: [],
      activeCampaignId: null,
      addCampaign: (campaign) =>
        set((state) => ({
          campaigns: [...state.campaigns, campaign],
        })),
      updateCampaign: (id, data) =>
        set((state) => ({
          campaigns: state.campaigns.map((c) =>
            c.id === id
              ? { ...c, ...data, updatedAt: new Date().toISOString() }
              : c
          ),
        })),
      deleteCampaign: (id) =>
        set((state) => ({
          campaigns: state.campaigns.filter((c) => c.id !== id),
          activeCampaignId:
            state.activeCampaignId === id ? null : state.activeCampaignId,
        })),
      setActiveCampaign: (id) => set({ activeCampaignId: id }),
      getCampaign: (id) => get().campaigns.find((c) => c.id === id),
      getActiveCampaign: () => {
        const state = get()
        return state.campaigns.find((c) => c.id === state.activeCampaignId)
      },
    }),
    {
      name: "feyforge-campaigns",
    }
  )
)
