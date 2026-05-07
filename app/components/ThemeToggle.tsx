"use client";

import { useTheme } from "@designbase/components";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "2rem",
        height: "2rem",
        borderRadius: "var(--ds-radius-lg)",
        border: "1.5px solid var(--ds-color-border-default)",
        background: "transparent",
        color: "var(--ds-color-text-secondary)",
        cursor: "pointer",
        fontSize: "0.9rem",
        transition: "background 120ms, color 120ms",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "var(--ds-color-bg-secondary)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--ds-color-text-primary)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--ds-color-text-secondary)";
      }}
    >
      {resolvedTheme === "dark" ? "☀" : "☾"}
    </button>
  );
}
