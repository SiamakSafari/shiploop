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

interface UserMessage {
  id: string;
  content: string;
  timestamp: Date;
  response?: string;
  isLoading?: boolean;
}

interface CoachState {
  // Settings
  selectedPersonality: CoachPersonality;
  isEnabled: boolean;
  showNotifications: boolean;
  soundEnabled: boolean;
  soundVolume: number;

  // Messages
  messages: CoachMessage[];
  userMessages: UserMessage[];
  unreadCount: number;

  // UI State
  isChatOpen: boolean;
  isMinimized: boolean;

  // Actions
  setPersonality: (personality: CoachPersonality) => void;
  setEnabled: (enabled: boolean) => void;
  setShowNotifications: (show: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setSoundVolume: (volume: number) => void;
  toggleChat: () => void;
  minimizeChat: () => void;
  maximizeChat: () => void;
  closeChat: () => void;

  // Message actions
  addMessage: (trigger: MessageTrigger, context: CoachContext) => CoachMessage;
  addUserMessage: (content: string) => string;
  setUserMessageResponse: (messageId: string, response: string) => void;
  setUserMessageLoading: (messageId: string, loading: boolean) => void;
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
      soundEnabled: true,
      soundVolume: 0.5,

      // Messages
      messages: [],
      userMessages: [],
      unreadCount: 0,

      // UI State
      isChatOpen: false,
      isMinimized: false,

      // Settings actions
      setPersonality: (personality) => set({ selectedPersonality: personality }),
      setEnabled: (enabled) => set({ isEnabled: enabled }),
      setShowNotifications: (show) => set({ showNotifications: show }),
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      setSoundVolume: (volume) => set({ soundVolume: volume }),

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

      // User message actions (for Ask Coach feature)
      addUserMessage: (content) => {
        const id = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newMessage: UserMessage = {
          id,
          content,
          timestamp: new Date(),
          isLoading: true,
        };

        set((state) => ({
          userMessages: [newMessage, ...state.userMessages].slice(0, 50),
        }));

        return id;
      },

      setUserMessageResponse: (messageId, response) =>
        set((state) => ({
          userMessages: state.userMessages.map((m) =>
            m.id === messageId ? { ...m, response, isLoading: false } : m
          ),
        })),

      setUserMessageLoading: (messageId, loading) =>
        set((state) => ({
          userMessages: state.userMessages.map((m) =>
            m.id === messageId ? { ...m, isLoading: loading } : m
          ),
        })),

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

      clearMessages: () => set({ messages: [], userMessages: [], unreadCount: 0 }),
    }),
    {
      name: "shiploop-coach",
      partialize: (state) => ({
        selectedPersonality: state.selectedPersonality,
        isEnabled: state.isEnabled,
        showNotifications: state.showNotifications,
        soundEnabled: state.soundEnabled,
        soundVolume: state.soundVolume,
        messages: state.messages.slice(0, 20), // Only persist last 20 messages
        userMessages: state.userMessages.slice(0, 10), // Only persist last 10 user messages
      }),
    }
  )
);

// Helper hook to get the current coach config
export function useCoachConfig() {
  const personality = useCoachStore((state) => state.selectedPersonality);
  return COACH_PERSONALITIES[personality];
}
