import Link from "next/link";
import { ThemeToggle } from "./components/ThemeToggle";

const features = [
  { title: "Design Tokens", description: "Define and manage colors, typography, spacing, and more in one place.", icon: "🎨" },
  { title: "Team Collaboration", description: "Work together in real time. Share tokens and components across your team.", icon: "👥" },
  { title: "Export Anywhere", description: "Export to CSS variables, Tailwind config, Figma, or JSON with one click.", icon: "📦" },
  { title: "Version History", description: "Track every change to your design system with a full audit trail.", icon: "🕓" },
  { title: "Component Docs", description: "Auto-generate documentation for every component in your system.", icon: "📄" },
  { title: "Multi-brand", description: "Manage multiple brands and themes from a single workspace.", icon: "🏷️" },
];

export default function LandingPage() {
  return (
    <div
      className="min-h-screen font-[family-name:var(--font-geist-sans)]"
      style={{ background: "var(--ds-color-bg-primary)", color: "var(--ds-color-text-primary)" }}
    >
      <nav
        className="flex items-center justify-between px-8 py-5"
        style={{ borderBottom: "1px solid var(--ds-color-border-default)" }}
      >
        <span className="text-xl font-bold tracking-tight" style={{ color: "var(--ds-color-text-primary)" }}>
          DesignBase
        </span>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-sm transition-colors"
            style={{ color: "var(--ds-color-text-secondary)" }}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm px-4 py-2 rounded-lg transition-colors"
            style={{ background: "var(--ds-color-text-primary)", color: "var(--ds-color-bg-primary)" }}
          >
            Get started free
          </Link>
        </div>
      </nav>

      <section className="flex flex-col items-center text-center px-6 pt-24 pb-20">
        <span className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--ds-color-accent-default)" }}>
          Design Systems Platform
        </span>
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight max-w-3xl" style={{ color: "var(--ds-color-text-primary)" }}>
          Build design systems that{" "}
          <span style={{ color: "var(--ds-color-accent-default)" }}>scale with your team</span>
        </h1>
        <p className="mt-6 text-lg max-w-xl" style={{ color: "var(--ds-color-text-secondary)" }}>
          DesignBase is the single source of truth for your design tokens, components, and
          documentation — keeping designers and engineers perfectly in sync.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/signup"
            className="px-8 py-3 font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-200"
            style={{ background: "var(--ds-color-accent-default)", color: "#fff" }}
          >
            Start for free
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 font-semibold rounded-xl transition-colors"
            style={{
              background: "var(--ds-color-bg-primary)",
              color: "var(--ds-color-text-primary)",
              border: "1.5px solid var(--ds-color-border-default)",
            }}
          >
            Sign in
          </Link>
        </div>
        <p className="mt-4 text-xs" style={{ color: "var(--ds-color-text-muted)" }}>
          No credit card required · Free for small teams
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-28">
        <h2 className="text-center text-2xl font-bold mb-12" style={{ color: "var(--ds-color-text-primary)" }}>
          Everything your design system needs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl transition-colors"
              style={{
                background: "var(--ds-color-bg-secondary)",
                border: "1px solid var(--ds-color-border-default)",
              }}
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold mb-1" style={{ color: "var(--ds-color-text-primary)" }}>{f.title}</h3>
              <p className="text-sm" style={{ color: "var(--ds-color-text-secondary)" }}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 text-center" style={{ background: "var(--ds-color-accent-default)" }}>
        <h2 className="text-3xl font-bold text-white mb-4">Ready to unify your design system?</h2>
        <p className="mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.8)" }}>
          Join thousands of teams already building better products with DesignBase.
        </p>
        <Link
          href="/signup"
          className="inline-block px-8 py-3 font-semibold rounded-xl transition-colors"
          style={{ background: "#fff", color: "var(--ds-color-accent-default)" }}
        >
          Get started free
        </Link>
      </section>

      <footer
        className="text-center py-8 text-xs"
        style={{ color: "var(--ds-color-text-muted)", borderTop: "1px solid var(--ds-color-border-default)" }}
      >
        © 2026 DesignBase. All rights reserved.
      </footer>
    </div>
  );
}
