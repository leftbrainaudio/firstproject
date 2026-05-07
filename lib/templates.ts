export type StyleTemplate =
  | "modern"
  | "brutalist"
  | "minimalist"
  | "sophisticated"
  | "contemporary"
  | "traditional";

export const ALL_TEMPLATES: StyleTemplate[] = [
  "modern",
  "brutalist",
  "minimalist",
  "sophisticated",
  "contemporary",
  "traditional",
];

export interface TemplateStyle {
  label: string;
  tagline: string;
  description: string;
  fontFamily: string;
  headingWeight: string;
  bodyWeight: string;
  letterSpacing: string;
  textTransform?: "uppercase";
  borderRadius: string;
  buttonRadius: string;
  cardRadius: string;
  inputRadius: string;
  borderWidth: string;
  shadow: string;
  buttonShadow: string;
  defaultColors: string[];
}

export const TEMPLATE_STYLES: Record<StyleTemplate, TemplateStyle> = {
  modern: {
    label: "Modern",
    tagline: "Tech-forward brands",
    description: "Clean geometry, high contrast, bold type.",
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    headingWeight: "700",
    bodyWeight: "500",
    letterSpacing: "-0.01em",
    borderRadius: "8px",
    buttonRadius: "8px",
    cardRadius: "10px",
    inputRadius: "8px",
    borderWidth: "1px",
    shadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
    buttonShadow: "0 1px 2px rgba(0,0,0,0.08)",
    defaultColors: ["#2563eb", "#1e40af", "#93c5fd", "#1e293b", "#f1f5f9"],
  },
  brutalist: {
    label: "Brutalist",
    tagline: "Raw, uncompromising, bold",
    description: "Stark, blunt, intentionally confrontational. Thick borders, flat colour.",
    fontFamily: '"Courier New", Courier, monospace',
    headingWeight: "900",
    bodyWeight: "700",
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    borderRadius: "0px",
    buttonRadius: "0px",
    cardRadius: "0px",
    inputRadius: "0px",
    borderWidth: "3px",
    shadow: "none",
    buttonShadow: "4px 4px 0 #000",
    defaultColors: ["#facc15", "#1c1917", "#dc2626", "#f5f5f4", "#a8a29e"],
  },
  minimalist: {
    label: "Minimalist",
    tagline: "Less, but better",
    description: "Whitespace-first, quiet palette, restrained type. Nothing superfluous.",
    fontFamily: 'system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
    headingWeight: "500",
    bodyWeight: "400",
    letterSpacing: "0.03em",
    borderRadius: "4px",
    buttonRadius: "4px",
    cardRadius: "4px",
    inputRadius: "4px",
    borderWidth: "1px",
    shadow: "none",
    buttonShadow: "none",
    defaultColors: ["#404040", "#a3a3a3", "#e5e5e5", "#fafafa", "#171717"],
  },
  sophisticated: {
    label: "Sophisticated",
    tagline: "Refined, elegant, authoritative",
    description: "Rich palette, layered shadows, and elegant serif typography.",
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    headingWeight: "700",
    bodyWeight: "500",
    letterSpacing: "0.01em",
    borderRadius: "12px",
    buttonRadius: "12px",
    cardRadius: "14px",
    inputRadius: "10px",
    borderWidth: "1px",
    shadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
    buttonShadow: "0 2px 8px rgba(0,0,0,0.14)",
    defaultColors: ["#7c3aed", "#4c1d95", "#ddd6fe", "#1a0533", "#fdf4ff"],
  },
  contemporary: {
    label: "Contemporary",
    tagline: "Warm, rounded, human",
    description: "Organic pill shapes, warm tones, approachable and inclusive feel.",
    fontFamily: '"Trebuchet MS", "Segoe UI", system-ui, sans-serif',
    headingWeight: "700",
    bodyWeight: "500",
    letterSpacing: "-0.01em",
    borderRadius: "20px",
    buttonRadius: "100px",
    cardRadius: "20px",
    inputRadius: "100px",
    borderWidth: "1.5px",
    shadow: "0 2px 16px rgba(0,0,0,0.06)",
    buttonShadow: "0 2px 8px rgba(0,0,0,0.08)",
    defaultColors: ["#10b981", "#065f46", "#a7f3d0", "#fff7ed", "#1a2e2a"],
  },
  traditional: {
    label: "Traditional",
    tagline: "Timeless, trustworthy, classic",
    description: "Classic proportions, muted palette, and enduring serif authority.",
    fontFamily: 'Georgia, "Palatino Linotype", Palatino, serif',
    headingWeight: "700",
    bodyWeight: "400",
    letterSpacing: "0.03em",
    borderRadius: "4px",
    buttonRadius: "4px",
    cardRadius: "6px",
    inputRadius: "4px",
    borderWidth: "1px",
    shadow: "0 1px 4px rgba(0,0,0,0.12)",
    buttonShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 1px 3px rgba(0,0,0,0.12)",
    defaultColors: ["#b45309", "#78350f", "#fde68a", "#1c1612", "#f5f0e8"],
  },
};

export function isLightColor(hex: string): boolean {
  if (hex.length < 7) return true;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}
