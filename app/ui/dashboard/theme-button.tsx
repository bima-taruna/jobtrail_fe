"use client";

import { useTheme } from "next-themes";
import { Toggle } from "@/app/ui/components/toggle";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a static button (no aria/data mismatch)
    return (
      <button
        type="button"
        aria-label="Toggle dark mode"
        className="rounded-full p-2"
      >
        <Sun size={18} />
      </button>
    );
  }

  return (
    <Toggle
      pressed={theme === "dark"}
      onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
      aria-label="Toggle dark mode"
      className="rounded-full p-2"
    >
      {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
    </Toggle>
  );
}
