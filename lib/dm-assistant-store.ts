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
  addMessage: (
    conversationId: string,
    message: Omit<Message, "id" | "timestamp">
  ) => Message
  updateLastMessage: (conversationId: string, content: string) => void
  clearMessages: (conversationId: string) => void

  // Getters
  getConversation: (id: string) => Conversation | undefined
  getActiveConversation: () => Conversation | undefined
  getConversationsByCampaign: (campaignId: string) => Conversation[]

  // Loading state
  setLoading: (loading: boolean) => void
}

// Generate unique IDs
const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

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
          activeConversationId:
            state.activeConversationId === id
              ? null
              : state.activeConversationId,
        })),

      setActiveConversation: (id: string | null) =>
        set({ activeConversationId: id }),

      updateConversationTitle: (id: string, title: string) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id
              ? { ...c, title, updatedAt: new Date().toISOString() }
              : c
          ),
        })),

      addMessage: (
        conversationId: string,
        message: Omit<Message, "id" | "timestamp">
      ) => {
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
              if (
                c.title === "New Chat" &&
                message.role === "user" &&
                c.messages.length === 0
              ) {
                title =
                  message.content.slice(0, 50) +
                  (message.content.length > 50 ? "..." : "")
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
              ? {
                  ...c,
                  messages: [],
                  title: "New Chat",
                  updatedAt: new Date().toISOString(),
                }
              : c
          ),
        })),

      updateLastMessage: (conversationId: string, content: string) =>
        set((state) => ({
          conversations: state.conversations.map((c) => {
            if (c.id === conversationId && c.messages.length > 0) {
              const messages = [...c.messages]
              messages[messages.length - 1] = {
                ...messages[messages.length - 1],
                content,
              }
              return { ...c, messages, updatedAt: new Date().toISOString() }
            }
            return c
          }),
        })),

      getConversation: (id: string) =>
        get().conversations.find((c) => c.id === id),

      getActiveConversation: () => {
        const state = get()
        return state.conversations.find(
          (c) => c.id === state.activeConversationId
        )
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
