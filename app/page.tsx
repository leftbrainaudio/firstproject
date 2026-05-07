import Link from "next/link";

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
    <div className="min-h-screen bg-white font-[family-name:var(--font-geist-sans)]">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <span className="text-xl font-bold tracking-tight text-gray-900">DesignBase</span>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Log in</Link>
          <Link href="/signup" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            Get started free
          </Link>
        </div>
      </nav>

      <section className="flex flex-col items-center text-center px-6 pt-24 pb-20">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-4">Design Systems Platform</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight max-w-3xl">
          Build design systems that{" "}
          <span className="text-indigo-600">scale with your team</span>
        </h1>
        <p className="mt-6 text-lg text-gray-500 max-w-xl">
          DesignBase is the single source of truth for your design tokens, components, and
          documentation — keeping designers and engineers perfectly in sync.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/signup" className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-200">
            Start for free
          </Link>
          <Link href="/login" className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-gray-400 transition-colors">
            Sign in
          </Link>
        </div>
        <p className="mt-4 text-xs text-gray-400">No credit card required · Free for small teams</p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-28">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-12">Everything your design system needs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-indigo-600 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to unify your design system?</h2>
        <p className="text-indigo-200 mb-8 max-w-md mx-auto">
          Join thousands of teams already building better products with DesignBase.
        </p>
        <Link href="/signup" className="inline-block px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors">
          Get started free
        </Link>
      </section>

      <footer className="text-center py-8 text-xs text-gray-400 border-t border-gray-100">
        © 2026 DesignBase. All rights reserved.
      </footer>
    </div>
  );
}
