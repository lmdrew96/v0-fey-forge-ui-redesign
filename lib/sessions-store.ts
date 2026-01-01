import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Session {
  id: string
  campaignId: string
  sessionNumber: number
  title: string
  date: string
  summary: string
  attendees: string[] // character IDs
  xpAwarded: number
  loot: string[]
  highlights: string[]
  dmNotes: string
  createdAt: string
  updatedAt: string
}

interface SessionsStore {
  sessions: Session[]
  addSession: (session: Session) => void
  updateSession: (id: string, data: Partial<Session>) => void
  deleteSession: (id: string) => void
  getSession: (id: string) => Session | undefined
  getSessionsByCampaign: (campaignId: string) => Session[]
  getRecentSessions: (campaignId: string, limit?: number) => Session[]
}

export const useSessionsStore = create<SessionsStore>()(
  persist(
    (set, get) => ({
      // Start with empty array - sample data removed for production
      sessions: [],
      addSession: (session) =>
        set((state) => ({
          sessions: [...state.sessions, session],
        })),
      updateSession: (id, data) =>
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === id
              ? { ...s, ...data, updatedAt: new Date().toISOString() }
              : s
          ),
        })),
      deleteSession: (id) =>
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== id),
        })),
      getSession: (id) => get().sessions.find((s) => s.id === id),
      getSessionsByCampaign: (campaignId) =>
        get()
          .sessions.filter((s) => s.campaignId === campaignId)
          .sort((a, b) => b.sessionNumber - a.sessionNumber),
      getRecentSessions: (campaignId, limit = 5) =>
        get()
          .sessions.filter((s) => s.campaignId === campaignId)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, limit),
    }),
    {
      name: "feyforge-sessions",
    }
  )
)
