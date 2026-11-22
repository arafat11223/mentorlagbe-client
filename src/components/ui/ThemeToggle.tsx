"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";

const subscribe = () => () => {};

const getClientSnapshot = () => true;

const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const themes = ["system", "light", "dark"] as const;

  function toggleTheme() {
    const currentIndex = themes.indexOf(
      theme as (typeof themes)[number]
    );

    const nextIndex = (currentIndex + 1) % themes.length;

    setTheme(themes[nextIndex]);
  }

  const icon =
    !mounted || theme === "system" ? (
      <Monitor size={19} />
    ) : theme === "dark" ? (
      <Moon size={19} />
    ) : (
      <Sun size={19} />
    );

  const label = !mounted
    ? "Change theme"
    : `Current theme: ${theme}. Click to change theme`;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="
        fixed bottom-5 right-5 z-50
        flex h-11 w-11 items-center justify-center
        rounded-full border border-border
        bg-surface text-foreground
        shadow-[var(--shadow-card)]
        transition-all duration-200
        hover:scale-105 hover:bg-surface-secondary
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-primary
      "
    >
      {icon}
    </button>
  );
}