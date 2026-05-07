import Link from "next/link";

const sections = [
  {
    heading: "Getting Started",
    items: [
      { title: "Introduction", desc: "What Ergo, Design is and how it works.", href: "#" },
      { title: "Installation", desc: "Add @designbase/components and @designbase/tokens to your project.", href: "#", code: "npm install @designbase/components @designbase/tokens" },
      { title: "Setup", desc: "Wrap your app with ThemeProvider to activate the token system.", href: "#", code: `import { ThemeProvider } from "@designbase/components";\n\nexport default function App({ children }) {\n  return <ThemeProvider>{children}</ThemeProvider>;\n}` },
    ],
  },
  {
    heading: "Theming",
    items: [
      { title: "Default Theme", desc: "The built-in token scale — colors, spacing, typography, radii, shadows.", href: "#" },
      { title: "Customizing Tokens", desc: "Override any token with CSS custom properties.", href: "#", code: `:root {\n  --ds-color-accent-default: #e11d48;\n  --ds-radius-lg: 0.75rem;\n}` },
      { title: "Dark Mode", desc: "Use the useTheme hook to toggle between light, dark, and system.", href: "#", code: `import { useTheme } from "@designbase/components";\n\nconst { theme, toggleTheme } = useTheme();` },
      { title: "Color Tokens", desc: "Semantic color aliases that automatically swap in dark mode.", href: "#" },
    ],
  },
  {
    heading: "Components",
    items: [
      { title: "Button", desc: "Solid, outline, and ghost variants across 5 color schemes and 3 sizes.", href: "/dashboard/components", code: `<Button variant="solid" colorScheme="brand" size="md">\n  Click me\n</Button>` },
      { title: "Badge", desc: "Solid, subtle, and outline badges for status and labelling.", href: "/dashboard/components", code: `<Badge variant="subtle" colorScheme="success">Active</Badge>` },
      { title: "Input", desc: "Text fields with label, helper text, error state, and icon slots.", href: "/dashboard/components", code: `<Input label="Email" placeholder="you@co.com" errorText="Required" />` },
      { title: "Card", desc: "Card.Header, Card.Body, and Card.Footer with flat/raised/elevated variants.", href: "/dashboard/components", code: `<Card variant="raised">\n  <Card.Header>Title</Card.Header>\n  <Card.Body>Content</Card.Body>\n</Card>` },
      { title: "Modal", desc: "Portal-based dialog with ESC-to-close, overlay click, and size options.", href: "/dashboard/components", code: `<Modal isOpen={open} onClose={onClose} size="md">\n  <Modal.Header onClose={onClose}>Title</Modal.Header>\n  <Modal.Body>Content</Modal.Body>\n</Modal>` },
      { title: "Text", desc: "Heading, body, caption, code, and label variants with size and color props.", href: "/dashboard/components", code: `<Text variant="heading" size="2xl">Hello</Text>\n<Text variant="body" color="secondary">Subtext</Text>` },
      { title: "Stack / HStack / VStack", desc: "Flexbox layout helpers with gap, align, and justify props.", href: "/dashboard/components", code: `<HStack gap={4} align="center">\n  <Badge>Tag</Badge>\n  <Text>Label</Text>\n</HStack>` },
    ],
  },
  {
    heading: "Tokens Reference",
    items: [
      { title: "Colors", desc: "Brand (50–900), neutral (0–1000), success, error, warning palettes.", href: "/dashboard/tokens" },
      { title: "Spacing", desc: "--ds-space-0 through --ds-space-16 on a 4px base scale.", href: "/dashboard/tokens" },
      { title: "Typography", desc: "Font families, sizes (xs–4xl), weights, and line heights.", href: "/dashboard/tokens" },
      { title: "Border Radius", desc: "--ds-radius-none through --ds-radius-full.", href: "/dashboard/tokens" },
      { title: "Shadows", desc: "--ds-shadow-sm through --ds-shadow-xl.", href: "/dashboard/tokens" },
      { title: "Z-Index", desc: "base, raised, overlay, modal, toast scale.", href: "/dashboard/tokens" },
    ],
  },
];

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="mt-3 p-4 rounded-xl text-xs font-mono bg-gray-950 text-gray-100 overflow-x-auto leading-relaxed">
      {code}
    </pre>
  );
}

export default function DocsPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Documentation</h1>
      <p className="text-gray-500 mb-10">Everything you need to build with Ergo, Design.</p>

      <div className="flex flex-col gap-12">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-4">
              {section.heading}
            </h2>
            <div className="flex flex-col gap-6">
              {section.items.map((item) => (
                <div key={item.title} className="border-l-2 border-gray-100 pl-5">
                  <Link
                    href={item.href}
                    className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                  >
                    {item.title} →
                  </Link>
                  <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                  {"code" in item && item.code && <CodeBlock code={item.code} />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
