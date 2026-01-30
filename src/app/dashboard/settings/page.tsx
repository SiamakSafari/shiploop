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
          <Settings className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Settings</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Manage your account and preferences.
        </p>
      </div>

      {/* Profile section */}
      <div className="glass hover-lift rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-gray-50">
            <User className="h-4 w-4 text-primary" />
            Profile
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your public profile information.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-primary/30">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-primary text-white text-lg font-medium">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <button className="rounded-xl bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 transition-all hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-50 border border-border">
              Change Avatar
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Name</label>
              <Input defaultValue={user?.name} className="border-border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 placeholder:text-gray-400 dark:placeholder:text-gray-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Username</label>
              <Input defaultValue={user?.username} className="border-border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 placeholder:text-gray-400 dark:placeholder:text-gray-500" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
              <Input type="email" defaultValue={user?.email} className="border-border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 placeholder:text-gray-400 dark:placeholder:text-gray-500" />
            </div>
          </div>

          <button className="rounded-xl bg-primary px-5 py-2.5 font-medium text-white shadow-md transition-all hover:bg-primary/90 active:scale-[0.97]">
            Save Changes
          </button>
        </div>
      </div>

      {/* Theme section */}
      <div className="glass hover-lift rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-gray-50">
            <Sun className="h-4 w-4 text-amber-500" />
            Appearance
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Customize how ShipLoop looks.</p>
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
                    ? "border-primary bg-gray-50 dark:bg-gray-900/30 shadow-md"
                    : "border-border hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
              >
                <t.icon className={cn("h-6 w-6", theme === t.value ? "text-primary" : "text-gray-400 dark:text-gray-500")} />
                <span className={cn("text-sm font-medium", theme === t.value ? "text-gray-900 dark:text-gray-50" : "text-gray-500 dark:text-gray-400")}>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications section */}
      <div className="glass hover-lift rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-gray-50">
            <Bell className="h-4 w-4 text-primary" />
            Notifications
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure your notification preferences.</p>
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
        <div className="p-4 border-b border-border">
          <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-gray-50">
            <Globe className="h-4 w-4 text-emerald-600" />
            Public Profile
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your public presence.</p>
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
        <div className="p-4 border-b border-border">
          <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-gray-50">
            <Keyboard className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            Keyboard Shortcuts
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Quick navigation and actions.</p>
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
    <div className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-border">
      <div className="space-y-0.5">
        <p className="font-medium text-gray-900 dark:text-gray-50">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
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
    <div className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-800/50 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-border">
      <span className="text-sm text-gray-600 dark:text-gray-300">{description}</span>
      <kbd className="rounded-lg bg-gray-200 dark:bg-gray-700 px-2.5 py-1 font-mono text-xs text-gray-600 dark:text-gray-300">
        {shortcut}
      </kbd>
    </div>
  );
}
