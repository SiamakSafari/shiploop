"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Howl } from "howler";

export type SoundName = "notification" | "achievement" | "click" | "success" | "error";

// Sound URLs - using free sound effects
const SOUNDS: Record<SoundName, string> = {
  notification: "https://cdn.freesound.org/previews/536/536420_4921277-lq.mp3",
  achievement: "https://cdn.freesound.org/previews/270/270404_5123851-lq.mp3",
  click: "https://cdn.freesound.org/previews/256/256116_4772965-lq.mp3",
  success: "https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3",
  error: "https://cdn.freesound.org/previews/142/142608_1840739-lq.mp3",
};

// Alternative: Local sounds (when files are available)
// const LOCAL_SOUNDS: Record<SoundName, string> = {
//   notification: "/sounds/notification.mp3",
//   achievement: "/sounds/achievement.mp3",
//   click: "/sounds/click.mp3",
//   success: "/sounds/success.mp3",
//   error: "/sounds/error.mp3",
// };

interface UseSoundOptions {
  volume?: number;
  enabled?: boolean;
}

interface UseSoundReturn {
  play: (sound: SoundName) => void;
  stop: (sound: SoundName) => void;
  setVolume: (volume: number) => void;
  setEnabled: (enabled: boolean) => void;
  isEnabled: boolean;
  volume: number;
}

export function useSound(options: UseSoundOptions = {}): UseSoundReturn {
  const { volume: initialVolume = 0.5, enabled: initialEnabled = true } = options;

  const [volume, setVolumeState] = useState(initialVolume);
  const [isEnabled, setIsEnabled] = useState(initialEnabled);
  const soundsRef = useRef<Map<SoundName, Howl>>(new Map());

  // Initialize sounds lazily
  const getSound = useCallback((name: SoundName): Howl | null => {
    if (!soundsRef.current.has(name)) {
      try {
        const sound = new Howl({
          src: [SOUNDS[name]],
          volume,
          preload: false,
          html5: true, // Better for web
        });
        soundsRef.current.set(name, sound);
      } catch {
        console.warn(`[Sound] Failed to initialize sound: ${name}`);
        return null;
      }
    }
    return soundsRef.current.get(name) || null;
  }, [volume]);

  // Play a sound
  const play = useCallback(
    (name: SoundName) => {
      if (!isEnabled) return;

      const sound = getSound(name);
      if (sound) {
        sound.volume(volume);
        sound.play();
      }
    },
    [isEnabled, volume, getSound]
  );

  // Stop a sound
  const stop = useCallback((name: SoundName) => {
    const sound = soundsRef.current.get(name);
    if (sound) {
      sound.stop();
    }
  }, []);

  // Update volume for all sounds
  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    soundsRef.current.forEach((sound) => {
      sound.volume(newVolume);
    });
  }, []);

  // Enable/disable sounds
  const setEnabled = useCallback((enabled: boolean) => {
    setIsEnabled(enabled);
    if (!enabled) {
      // Stop all playing sounds
      soundsRef.current.forEach((sound) => {
        sound.stop();
      });
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      soundsRef.current.forEach((sound) => {
        sound.unload();
      });
      soundsRef.current.clear();
    };
  }, []);

  return {
    play,
    stop,
    setVolume,
    setEnabled,
    isEnabled,
    volume,
  };
}

// Standalone play function for simple usage
let globalHowl: Howl | null = null;

export function playSound(name: SoundName, volume = 0.5): void {
  try {
    // Reuse or create Howl instance
    if (globalHowl) {
      globalHowl.unload();
    }

    globalHowl = new Howl({
      src: [SOUNDS[name]],
      volume,
      html5: true,
    });

    globalHowl.play();
  } catch (error) {
    console.warn(`[Sound] Failed to play sound: ${name}`, error);
  }
}
