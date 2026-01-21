import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  CoachPersonality,
  CoachMessage,
  CoachContext,
  MessageTrigger,
  COACH_PERSONALITIES,
} from "@/lib/coach";
import { getCoachMessage, getCoachEmoji } from "@/lib/coach";

interface CoachState {
  // Settings
  selectedPersonality: CoachPersonality;
  isEnabled: boolean;
  showNotifications: boolean;

  // Messages
  messages: CoachMessage[];
  unreadCount: number;

  // UI State
  isChatOpen: boolean;
  isMinimized: boolean;

  // Actions
  setPersonality: (personality: CoachPersonality) => void;
  setEnabled: (enabled: boolean) => void;
  setShowNotifications: (show: boolean) => void;
  toggleChat: () => void;
  minimizeChat: () => void;
  maximizeChat: () => void;
  closeChat: () => void;

  // Message actions
  addMessage: (trigger: MessageTrigger, context: CoachContext) => CoachMessage;
  markAsRead: (messageId: string) => void;
  markAllAsRead: () => void;
  clearMessages: () => void;
}

export const useCoachStore = create<CoachState>()(
  persist(
    (set, get) => ({
      // Default settings
      selectedPersonality: "hype-beast",
      isEnabled: true,
      showNotifications: true,

      // Messages
      messages: [],
      unreadCount: 0,

      // UI State
      isChatOpen: false,
      isMinimized: false,

      // Settings actions
      setPersonality: (personality) => set({ selectedPersonality: personality }),
      setEnabled: (enabled) => set({ isEnabled: enabled }),
      setShowNotifications: (show) => set({ showNotifications: show }),

      // UI actions
      toggleChat: () =>
        set((state) => ({
          isChatOpen: !state.isChatOpen,
          isMinimized: false,
        })),
      minimizeChat: () => set({ isMinimized: true }),
      maximizeChat: () => set({ isMinimized: false }),
      closeChat: () => set({ isChatOpen: false, isMinimized: false }),

      // Message actions
      addMessage: (trigger, context) => {
        const { selectedPersonality, isEnabled } = get();

        if (!isEnabled) {
          return {} as CoachMessage;
        }

        const content = getCoachMessage(selectedPersonality, trigger, context);
        const emoji = getCoachEmoji(selectedPersonality);

        const newMessage: CoachMessage = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          personality: selectedPersonality,
          trigger,
          content,
          emoji,
          timestamp: new Date(),
          isRead: false,
        };

        set((state) => ({
          messages: [newMessage, ...state.messages].slice(0, 50), // Keep last 50 messages
          unreadCount: state.unreadCount + 1,
        }));

        return newMessage;
      },

      markAsRead: (messageId) =>
        set((state) => ({
          messages: state.messages.map((m) =>
            m.id === messageId ? { ...m, isRead: true } : m
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        })),

      markAllAsRead: () =>
        set((state) => ({
          messages: state.messages.map((m) => ({ ...m, isRead: true })),
          unreadCount: 0,
        })),

      clearMessages: () => set({ messages: [], unreadCount: 0 }),
    }),
    {
      name: "shiploop-coach",
      partialize: (state) => ({
        selectedPersonality: state.selectedPersonality,
        isEnabled: state.isEnabled,
        showNotifications: state.showNotifications,
        messages: state.messages.slice(0, 20), // Only persist last 20 messages
      }),
    }
  )
);

// Helper hook to get the current coach config
export function useCoachConfig() {
  const personality = useCoachStore((state) => state.selectedPersonality);
  return COACH_PERSONALITIES[personality];
}
