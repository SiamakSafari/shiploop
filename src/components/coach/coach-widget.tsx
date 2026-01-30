"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Minus,
  Settings,
  Sparkles,
  Volume2,
  VolumeX,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useCoachStore, useCoachConfig } from "@/stores/use-coach-store";
import { COACH_PERSONALITIES, CoachPersonality } from "@/lib/coach";
import { formatRelativeTime } from "@/lib/utils";
import { ShareMessage } from "./share-message";
import { AskCoachInput } from "./ask-coach-input";
import { playSound } from "@/hooks/use-sound";

export function CoachWidget() {
  const {
    isChatOpen,
    isMinimized,
    messages,
    userMessages,
    unreadCount,
    selectedPersonality,
    isEnabled,
    showNotifications,
    soundEnabled,
    soundVolume,
    toggleChat,
    minimizeChat,
    maximizeChat,
    closeChat,
    setPersonality,
    setEnabled,
    setShowNotifications,
    setSoundEnabled,
    addUserMessage,
    setUserMessageResponse,
    setUserMessageLoading,
    markAllAsRead,
    clearMessages,
  } = useCoachStore();

  const [showSettings, setShowSettings] = useState(false);
  const config = useCoachConfig();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle sending a message to the coach
  const handleAskCoach = useCallback(async (question: string) => {
    const messageId = addUserMessage(question);

    // Play sound if enabled
    if (soundEnabled) {
      playSound("notification", soundVolume);
    }

    try {
      const response = await fetch("/api/coach/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          personality: selectedPersonality,
        }),
      });

      const data = await response.json();

      if (data.response) {
        setUserMessageResponse(messageId, data.response);
        // Play success sound
        if (soundEnabled) {
          playSound("success", soundVolume);
        }
      } else {
        setUserMessageResponse(messageId, "Sorry, I couldn't process that. Try again!");
      }
    } catch {
      setUserMessageLoading(messageId, false);
      setUserMessageResponse(messageId, "Oops! Something went wrong. Let's try again!");
    }
  }, [addUserMessage, setUserMessageResponse, setUserMessageLoading, selectedPersonality, soundEnabled, soundVolume]);

  // Mark messages as read when chat is opened
  useEffect(() => {
    if (isChatOpen && !isMinimized) {
      markAllAsRead();
    }
  }, [isChatOpen, isMinimized, markAllAsRead]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={toggleChat}
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg btn-glow relative group"
              style={{ backgroundColor: config.color }}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {config.avatar}
              </span>
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </motion.span>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : 500,
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed bottom-6 right-6 z-50 w-[380px] rounded-2xl overflow-hidden shadow-2xl border border-border",
              "glass-card-static"
            )}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4 border-b border-border"
              style={{ backgroundColor: `${config.color}15` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${config.color}30` }}
                >
                  {config.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{config.name}</h3>
                  <p className="text-xs text-muted-foreground">{config.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={isMinimized ? maximizeChat : minimizeChat}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={closeChat}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Settings panel */}
            <AnimatePresence>
              {showSettings && !isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-border overflow-hidden"
                >
                  <div className="p-4 space-y-4">
                    {/* Personality selector */}
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-2 block">
                        Coach Personality
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.values(COACH_PERSONALITIES).map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setPersonality(p.id)}
                            className={cn(
                              "flex items-center gap-2 p-2 rounded-lg border transition-all text-left",
                              selectedPersonality === p.id
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <span className="text-lg">{p.avatar}</span>
                            <div>
                              <div className="text-xs font-medium">{p.name}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notification toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Show notifications</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowNotifications(!showNotifications)}
                      >
                        {showNotifications ? (
                          <Volume2 className="h-4 w-4" />
                        ) : (
                          <VolumeX className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {/* Sound toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sound effects</span>
                      <Button
                        variant={soundEnabled ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className="h-8"
                      >
                        {soundEnabled ? "On" : "Off"}
                      </Button>
                    </div>

                    {/* Clear messages */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                      onClick={clearMessages}
                    >
                      <Trash2 className="h-4 w-4" />
                      Clear history
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            {!isMinimized && (
              <ScrollArea className="h-[280px] p-4" ref={scrollRef}>
                {messages.length === 0 && userMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div
                      className="h-16 w-16 rounded-full flex items-center justify-center text-3xl mb-4"
                      style={{ backgroundColor: `${config.color}20` }}
                    >
                      {config.avatar}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      No messages yet. Ask me anything or keep shipping!
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      &ldquo;{config.catchphrase}&rdquo;
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* User messages (Ask Coach conversations) */}
                    {userMessages.map((msg, index) => (
                      <div key={msg.id}>
                        {/* User's question */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3 justify-end mb-3"
                        >
                          <div className="max-w-[80%]">
                            <div className="bg-primary text-primary-foreground rounded-lg rounded-tr-none p-3">
                              <p className="text-sm">{msg.content}</p>
                            </div>
                            <span className="text-[10px] text-muted-foreground mt-1 block text-right">
                              {formatRelativeTime(new Date(msg.timestamp))}
                            </span>
                          </div>
                        </motion.div>

                        {/* Coach's response */}
                        {msg.isLoading ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-3"
                          >
                            <div
                              className="h-8 w-8 rounded-full flex items-center justify-center text-sm shrink-0"
                              style={{ backgroundColor: `${config.color}30` }}
                            >
                              {config.avatar}
                            </div>
                            <div className="bg-muted rounded-lg rounded-tl-none p-3">
                              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                            </div>
                          </motion.div>
                        ) : msg.response ? (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex gap-3"
                          >
                            <div
                              className="h-8 w-8 rounded-full flex items-center justify-center text-sm shrink-0"
                              style={{ backgroundColor: `${config.color}30` }}
                            >
                              {config.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="bg-muted rounded-lg rounded-tl-none p-3">
                                <p className="text-sm">{msg.response}</p>
                              </div>
                            </div>
                          </motion.div>
                        ) : null}
                      </div>
                    ))}

                    {/* Coach notifications */}
                    {messages.map((message, index) => {
                      const messageConfig = COACH_PERSONALITIES[message.personality];
                      return (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex gap-3 group"
                        >
                          <div
                            className="h-8 w-8 rounded-full flex items-center justify-center text-sm shrink-0"
                            style={{ backgroundColor: `${messageConfig.color}30` }}
                          >
                            {messageConfig.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium">
                                {messageConfig.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatRelativeTime(new Date(message.timestamp))}
                              </span>
                              <ShareMessage message={message} />
                            </div>
                            <div className="bg-muted rounded-lg rounded-tl-none p-3">
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            )}

            {/* Footer with Ask Coach */}
            {!isMinimized && (
              <div className="p-3 border-t border-border bg-muted/50 space-y-2">
                <AskCoachInput
                  onSend={handleAskCoach}
                  placeholder={`Ask ${config.name}...`}
                />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3" />
                  <span>
                    Your {config.name} is watching your progress...
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
