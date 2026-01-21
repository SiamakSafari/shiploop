"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCoachStore, useCoachConfig } from "@/stores/use-coach-store";
import { CoachMessage, COACH_PERSONALITIES } from "@/lib/coach";

interface CoachNotificationProps {
  message: CoachMessage;
  onDismiss: () => void;
  onClick?: () => void;
}

export function CoachNotification({
  message,
  onDismiss,
  onClick,
}: CoachNotificationProps) {
  const config = COACH_PERSONALITIES[message.personality];

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 8000); // Auto dismiss after 8 seconds

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={cn(
        "relative w-[340px] rounded-xl overflow-hidden shadow-2xl border border-border",
        "bg-card backdrop-blur-xl cursor-pointer"
      )}
      onClick={onClick}
    >
      {/* Colored top border */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: config.color }}
      />

      <div className="p-4">
        <div className="flex gap-3">
          {/* Avatar */}
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center text-xl shrink-0 animate-bounce-gentle"
            style={{ backgroundColor: `${config.color}30` }}
          >
            {config.avatar}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold" style={{ color: config.color }}>
                {config.name}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 -mr-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onDismiss();
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-sm text-foreground line-clamp-3">{message.content}</p>
          </div>
        </div>
      </div>

      {/* Progress bar for auto-dismiss */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 8, ease: "linear" }}
        className="absolute bottom-0 left-0 h-0.5"
        style={{ backgroundColor: config.color }}
      />
    </motion.div>
  );
}

// Container for managing multiple notifications
export function CoachNotificationContainer() {
  const { messages, showNotifications, isChatOpen, toggleChat } = useCoachStore();
  const [visibleNotifications, setVisibleNotifications] = useState<CoachMessage[]>([]);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  // Show new unread messages as notifications
  useEffect(() => {
    if (!showNotifications || isChatOpen) return;

    const unreadMessages = messages.filter(
      (m) => !m.isRead && !dismissedIds.has(m.id)
    );

    // Only show the most recent unread message
    if (unreadMessages.length > 0) {
      const latestMessage = unreadMessages[0];
      if (!visibleNotifications.find((n) => n.id === latestMessage.id)) {
        setVisibleNotifications((prev) => [latestMessage, ...prev].slice(0, 3));
      }
    }
  }, [messages, showNotifications, isChatOpen, dismissedIds, visibleNotifications]);

  const handleDismiss = (messageId: string) => {
    setDismissedIds((prev) => new Set([...prev, messageId]));
    setVisibleNotifications((prev) => prev.filter((n) => n.id !== messageId));
  };

  const handleClick = (messageId: string) => {
    handleDismiss(messageId);
    toggleChat();
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {visibleNotifications.map((notification) => (
          <CoachNotification
            key={notification.id}
            message={notification}
            onDismiss={() => handleDismiss(notification.id)}
            onClick={() => handleClick(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
