export default function DocsPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Documentation</h1>
      <p className="text-gray-500 mb-8">Guides and references for your design system.</p>

      <div className="grid gap-4">
        {[
          { title: "Getting Started", desc: "Set up your first token collection and export to code.", icon: "🚀" },
          { title: "Design Tokens", desc: "Learn how tokens are structured, named, and referenced.", icon: "◈" },
          { title: "Theming", desc: "Create light, dark, and brand-specific themes.", icon: "🎨" },
          { title: "Components", desc: "Using and customising the component library.", icon: "⬡" },
          { title: "Export Formats", desc: "CSS variables, Tailwind config, Figma tokens, and JSON.", icon: "📦" },
          { title: "Team & Permissions", desc: "Invite teammates and manage access levels.", icon: "👥" },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/20 transition-colors cursor-pointer"
          >
            <span className="text-2xl">{item.icon}</span>
            <div>
              <p className="font-semibold text-gray-900">{item.title}</p>
              <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
