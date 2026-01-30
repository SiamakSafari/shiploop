"use client";

import { useState } from "react";
import { Twitter, Copy, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { CoachMessage } from "@/lib/coach";

interface ShareMessageProps {
  message: CoachMessage;
  className?: string;
}

export function ShareMessage({ message, className }: ShareMessageProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `${message.content}\n\n${message.emoji} My AI coach on @shiploop`;

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
    setOpen(false);
    toast.success("Opening Twitter", {
      description: "Share your coach's wisdom!",
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity ${className}`}
        >
          <Share2 className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Coach Message</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          {/* Preview */}
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm whitespace-pre-wrap">{shareText}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={handleTwitterShare}
              className="flex-1 gap-2 bg-[#1DA1F2] hover:bg-[#1a8cd8]"
            >
              <Twitter className="h-4 w-4" />
              Share on Twitter
            </Button>
            <Button
              variant="outline"
              onClick={handleCopy}
              className="gap-2"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
