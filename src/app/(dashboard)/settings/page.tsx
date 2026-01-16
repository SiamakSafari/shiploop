"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, User, Bell, Globe, Settings, Keyboard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/stores";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const user = useAppStore((state) => state.user);

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Settings className="h-6 w-6 text-purple-400" />
          <h1 className="text-3xl font-bold text-gradient">Settings</h1>
        </div>
        <p className="text-white/60 text-lg">
          Manage your account and preferences.
        </p>
      </div>

      {/* Profile section */}
      <div className="glass hover-lift rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="flex items-center gap-2 text-base font-semibold text-white">
            <User className="h-4 w-4 text-cyan-400" />
            Profile
          </h3>
          <p className="text-sm text-white/50 mt-1">Your public profile information.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-purple-500/30">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-cyan-500 text-white text-lg font-medium">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <button className="rounded-xl bg-white/5 px-4 py-2 text-sm text-white/70 transition-all hover:bg-white/10 hover:text-white">
              Change Avatar
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">Name</label>
              <Input defaultValue={user?.name} className="glass border-white/10 bg-white/5 text-white placeholder:text-white/30" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">Username</label>
              <Input defaultValue={user?.username} className="glass border-white/10 bg-white/5 text-white placeholder:text-white/30" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-white/60">Email</label>
              <Input type="email" defaultValue={user?.email} className="glass border-white/10 bg-white/5 text-white placeholder:text-white/30" />
            </div>
          </div>

          <button className="rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-5 py-2.5 font-medium text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40">
            Save Changes
          </button>
        </div>
      </div>

      {/* Theme section */}
      <div className="glass hover-lift rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="flex items-center gap-2 text-base font-semibold text-white">
            <Sun className="h-4 w-4 text-yellow-400" />
            Appearance
          </h3>
          <p className="text-sm text-white/50 mt-1">Customize how ShipLoop looks.</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={cn(
                  "flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all",
                  theme === t.value
                    ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                    : "border-white/10 hover:border-white/30 hover:bg-white/5"
                )}
              >
                <t.icon className={cn("h-6 w-6", theme === t.value ? "text-purple-400" : "text-white/60")} />
                <span className={cn("text-sm font-medium", theme === t.value ? "text-white" : "text-white/60")}>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications section */}
      <div className="glass hover-lift rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="flex items-center gap-2 text-base font-semibold text-white">
            <Bell className="h-4 w-4 text-pink-400" />
            Notifications
          </h3>
          <p className="text-sm text-white/50 mt-1">Configure your notification preferences.</p>
        </div>
        <div className="p-6 space-y-4">
          <ToggleItem
            title="Email Notifications"
            description="Receive email updates about your projects."
            defaultChecked={user?.preferences.notifications}
          />
          <ToggleItem
            title="Weekly Digest"
            description="Get a weekly summary of your shipping progress."
            defaultChecked
          />
          <ToggleItem
            title="Streak Reminders"
            description="Get reminded to ship before your streak breaks."
            defaultChecked
          />
        </div>
      </div>

      {/* Public profile section */}
      <div className="glass hover-lift rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="flex items-center gap-2 text-base font-semibold text-white">
            <Globe className="h-4 w-4 text-emerald-400" />
            Public Profile
          </h3>
          <p className="text-sm text-white/50 mt-1">Manage your public presence.</p>
        </div>
        <div className="p-6 space-y-4">
          <ToggleItem
            title="Public Portfolio"
            description="Show your projects and Ship Score publicly."
            defaultChecked={user?.preferences.publicProfile}
          />
          <ToggleItem
            title="Show Revenue"
            description="Display your verified MRR on your profile."
            defaultChecked
          />
          <ToggleItem
            title="Appear on Leaderboard"
            description="Show your ranking on the public leaderboard."
            defaultChecked
          />
        </div>
      </div>

      {/* Keyboard shortcuts */}
      <div className="glass hover-lift rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="flex items-center gap-2 text-base font-semibold text-white">
            <Keyboard className="h-4 w-4 text-orange-400" />
            Keyboard Shortcuts
          </h3>
          <p className="text-sm text-white/50 mt-1">Quick navigation and actions.</p>
        </div>
        <div className="p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <ShortcutItem shortcut="Cmd + K" description="Open command palette" />
            <ShortcutItem shortcut="G then D" description="Go to Dashboard" />
            <ShortcutItem shortcut="G then L" description="Go to Launch Hub" />
            <ShortcutItem shortcut="G then B" description="Go to Leaderboard" />
            <ShortcutItem shortcut="G then I" description="Go to Ideas" />
            <ShortcutItem shortcut="G then A" description="Go to Analytics" />
            <ShortcutItem shortcut="G then P" description="Go to Projects" />
            <ShortcutItem shortcut="N" description="New Project" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleItem({
  title,
  description,
  defaultChecked,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/5 p-4 hover:bg-white/10 transition-colors">
      <div className="space-y-0.5">
        <p className="font-medium text-white">{title}</p>
        <p className="text-sm text-white/50">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

function ShortcutItem({
  shortcut,
  description,
}: {
  shortcut: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/5 p-3 hover:bg-white/10 transition-colors">
      <span className="text-sm text-white/60">{description}</span>
      <kbd className="rounded-lg bg-white/10 px-2.5 py-1 font-mono text-xs text-white/70">
        {shortcut}
      </kbd>
    </div>
  );
}
