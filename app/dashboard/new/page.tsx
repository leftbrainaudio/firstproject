"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDesignSystems } from "@/lib/design-systems";
import { TEMPLATE_STYLES, ALL_TEMPLATES, isLightColor, type StyleTemplate } from "@/lib/templates";
import { extractDominantColors } from "@/lib/color-extractor";

type Step = 1 | 2 | 3;

// ─── Mini component preview rendered with inline styles ───────────────────────
// Always renders on a light canvas so font/colour character is clear.

function StylePreview({
  template,
  primaryColor,
}: {
  template: StyleTemplate;
  primaryColor: string;
}) {
  const s = TEMPLATE_STYLES[template];
  const textOnPrimary = isLightColor(primaryColor) ? "#111827" : "#ffffff";
  const up = s.textTransform === "uppercase";

  return (
    <div
      style={{
        fontFamily: s.fontFamily,
        background: "#f9fafb",
        padding: "18px 16px 14px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* Typography sample */}
      <div>
        <p
          style={{
            fontSize: "15px",
            fontWeight: s.headingWeight,
            letterSpacing: s.letterSpacing,
            textTransform: s.textTransform,
            color: "#111827",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {up ? "YOUR BRAND" : "Your Brand"}
        </p>
        <p
          style={{
            fontSize: "11px",
            fontWeight: s.bodyWeight,
            letterSpacing: s.letterSpacing,
            color: "#6b7280",
            margin: "2px 0 0",
          }}
        >
          {up ? "DESIGN SYSTEM" : "Design system"}
        </p>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
        <span
          style={{
            display: "inline-block",
            backgroundColor: primaryColor,
            color: textOnPrimary,
            borderRadius: s.buttonRadius,
            border: `${s.borderWidth} solid ${primaryColor}`,
            boxShadow: s.buttonShadow,
            padding: "5px 13px",
            fontSize: "11px",
            fontWeight: s.bodyWeight,
            letterSpacing: s.letterSpacing,
            textTransform: s.textTransform,
            lineHeight: 1.4,
          }}
        >
          {up ? "CONFIRM" : "Confirm"}
        </span>
        <span
          style={{
            display: "inline-block",
            backgroundColor: "transparent",
            color: primaryColor,
            borderRadius: s.buttonRadius,
            border: `${s.borderWidth} solid ${primaryColor}`,
            padding: "5px 13px",
            fontSize: "11px",
            fontWeight: s.bodyWeight,
            letterSpacing: s.letterSpacing,
            textTransform: s.textTransform,
            lineHeight: 1.4,
          }}
        >
          {up ? "CANCEL" : "Cancel"}
        </span>
        <span
          style={{
            display: "inline-block",
            backgroundColor: primaryColor + "18",
            color: primaryColor,
            borderRadius: s.buttonRadius,
            border: `${s.borderWidth} solid ${primaryColor}44`,
            padding: "3px 9px",
            fontSize: "10px",
            fontWeight: s.bodyWeight,
            letterSpacing: s.letterSpacing,
            textTransform: s.textTransform,
            lineHeight: 1.4,
          }}
        >
          {up ? "ACTIVE" : "Active"}
        </span>
      </div>

      {/* Card */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: s.cardRadius,
          border: `${s.borderWidth} solid #e5e7eb`,
          boxShadow: s.shadow,
          padding: "10px 12px",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            fontWeight: s.headingWeight,
            color: "#111827",
            margin: "0 0 3px",
            letterSpacing: s.letterSpacing,
            textTransform: s.textTransform,
          }}
        >
          {up ? "CARD TITLE" : "Card Title"}
        </p>
        <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
          {up ? "SUPPORTING DETAIL" : "Supporting detail"}
        </p>
      </div>

      {/* Input */}
      <div>
        <p
          style={{
            fontSize: "10px",
            fontWeight: s.bodyWeight,
            color: "#374151",
            margin: "0 0 4px",
            letterSpacing: s.letterSpacing,
            textTransform: s.textTransform,
          }}
        >
          {up ? "EMAIL ADDRESS" : "Email address"}
        </p>
        <div
          style={{
            background: "#ffffff",
            border: `${s.borderWidth} solid #d1d5db`,
            borderRadius: s.inputRadius,
            padding: "6px 10px",
            fontSize: "11px",
            color: "#9ca3af",
            letterSpacing: s.letterSpacing,
          }}
        >
          you@company.com
        </div>
      </div>
    </div>
  );
}

// ─── Template selection card ──────────────────────────────────────────────────

function TemplateCard({
  t,
  selected,
  primaryColor,
  onSelect,
}: {
  t: StyleTemplate;
  selected: boolean;
  primaryColor: string;
  onSelect: () => void;
}) {
  const s = TEMPLATE_STYLES[t];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col text-left rounded-2xl border overflow-hidden transition-all ${
        selected
          ? "border-indigo-500 ring-2 ring-indigo-400 ring-offset-2 dark:ring-offset-gray-950"
          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
      }`}
    >
      {/* Live component preview — always light canvas */}
      <div className="relative">
        <StylePreview template={t} primaryColor={primaryColor} />
        {selected && (
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">✓</span>
          </div>
        )}
      </div>

      {/* Label */}
      <div className="px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex-1">
        <p
          className="text-sm font-semibold text-gray-900 dark:text-gray-100"
          style={{ fontFamily: s.fontFamily }}
        >
          {s.textTransform === "uppercase" ? s.label.toUpperCase() : s.label}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.tagline}</p>
      </div>
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NewDesignSystemPage() {
  const router = useRouter();
  const { createSystem } = useDesignSystems();

  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState("");
  const [template, setTemplate] = useState<StyleTemplate | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [extracting, setExtracting] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const primaryColor =
    colors[0] ??
    (template ? TEMPLATE_STYLES[template].defaultColors[0] : "#6366f1");

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    setPreviewSrc(URL.createObjectURL(file));
    setExtracting(true);
    try {
      const extracted = await extractDominantColors(file, 5);
      setColors(extracted);
    } catch {
      setUploadError("Couldn't extract colours. Try a different image.");
    } finally {
      setExtracting(false);
    }
  }, []);

  function handleCreate() {
    if (!template || !name.trim()) return;
    const finalColors =
      colors.length > 0 ? colors : TEMPLATE_STYLES[template].defaultColors;
    const system = createSystem(name.trim(), template, finalColors);
    router.push(`/dashboard/systems/${system.id}/tokens`);
  }

  const canAdvance = name.trim().length > 0 && template !== null;

  return (
    <div className="p-8 max-w-5xl mx-auto font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() =>
            step === 1 ? router.push("/dashboard") : setStep((s) => (s - 1) as Step)
          }
          className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-4 flex items-center gap-1 transition-colors"
        >
          ← {step === 1 ? "Back to overview" : "Back"}
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">New design system</h1>

        <div className="flex items-center gap-3 mt-4">
          {([1, 2, 3] as Step[]).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  s < step
                    ? "bg-indigo-600 text-white"
                    : s === step
                    ? "bg-indigo-600 text-white ring-2 ring-indigo-200 dark:ring-indigo-800"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                }`}
              >
                {s < step ? "✓" : s}
              </div>
              <span
                className={`text-sm ${
                  s === step
                    ? "text-gray-900 dark:text-gray-100 font-medium"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {s === 1 ? "Name & style" : s === 2 ? "Brand colours" : "Review"}
              </span>
              {s < 3 && <span className="text-gray-200 dark:text-gray-700">›</span>}
            </div>
          ))}
        </div>
      </div>

      {/* ── Step 1: Name + Template ── */}
      {step === 1 && (
        <div className="flex flex-col gap-8">
          <div className="max-w-sm">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Design system name
            </label>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && canAdvance) setStep(2); }}
              placeholder="e.g. Acme Brand, Internal Tools…"
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Choose a style
            </p>
            {/* 3-column grid — each card shows live component previews */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ALL_TEMPLATES.map((t) => (
                <TemplateCard
                  key={t}
                  t={t}
                  selected={template === t}
                  primaryColor={
                    template === t
                      ? primaryColor
                      : TEMPLATE_STYLES[t].defaultColors[0]
                  }
                  onSelect={() => setTemplate(t)}
                />
              ))}
            </div>
          </div>

          {template && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl px-5 py-4 max-w-sm">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                {TEMPLATE_STYLES[template].label}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {TEMPLATE_STYLES[template].description}
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!canAdvance}
              className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2: Brand colours ── */}
      {step === 2 && template && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: upload */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Upload your logo or a brand screenshot — we&apos;ll extract the dominant colours and apply them automatically.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Skip to use the template&apos;s defaults.</p>
            </div>

            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-10 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors bg-gray-50 dark:bg-gray-900 cursor-pointer"
            >
              {previewSrc ? (
                <img src={previewSrc} alt="Uploaded" className="max-h-24 max-w-full object-contain rounded-lg" />
              ) : (
                <>
                  <span className="text-3xl">⬆</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Click to upload</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG, SVG, WebP</span>
                </>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </button>

            {extracting && (
              <p className="text-sm text-indigo-600 dark:text-indigo-400 text-center">Extracting colours…</p>
            )}
            {uploadError && (
              <p className="text-sm text-red-600 dark:text-red-400">{uploadError}</p>
            )}

            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {colors.length > 0 ? "Extracted colours" : "Template defaults"}
              </p>
              <div className="flex gap-2.5 flex-wrap">
                {(colors.length > 0
                  ? colors
                  : TEMPLATE_STYLES[template].defaultColors
                ).map((c) => (
                  <div key={c} className="flex flex-col items-center gap-1">
                    <div
                      className="w-10 h-10 rounded-xl border border-white dark:border-gray-700 shadow"
                      style={{ backgroundColor: c }}
                    />
                    <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(3)}
                className="text-sm text-gray-500 dark:text-gray-400 px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Skip
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={extracting}
                className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-500 transition-colors disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          </div>

          {/* Right: live preview updates with extracted colours */}
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
              Live preview — {TEMPLATE_STYLES[template].label}
            </p>
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
              <StylePreview template={template} primaryColor={primaryColor} />
            </div>
          </div>
        </div>
      )}

      {/* ── Step 3: Review ── */}
      {step === 3 && template && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: summary */}
          <div className="flex flex-col gap-5">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col gap-4">
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold mb-1">Name</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold mb-1">Style</p>
                <p className="text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: TEMPLATE_STYLES[template].fontFamily }}>
                  {TEMPLATE_STYLES[template].label} — {TEMPLATE_STYLES[template].tagline}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold mb-2">Brand colours</p>
                <div className="flex gap-2 flex-wrap">
                  {(colors.length > 0 ? colors : TEMPLATE_STYLES[template].defaultColors).map((c) => (
                    <div key={c} className="w-8 h-8 rounded-lg border-2 border-white dark:border-gray-800 shadow-sm" style={{ backgroundColor: c }} title={c} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You can customise all tokens and components after creation.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="text-sm text-gray-500 dark:text-gray-400 px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleCreate}
                className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-500 transition-colors"
              >
                Create design system
              </button>
            </div>
          </div>

          {/* Right: final preview */}
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
              Preview
            </p>
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
              <StylePreview template={template} primaryColor={primaryColor} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
