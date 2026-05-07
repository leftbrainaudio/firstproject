"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDesignSystems, type StyleTemplate } from "@/lib/design-systems";
import { extractDominantColors } from "@/lib/color-extractor";

const templates: { id: StyleTemplate; label: string; description: string; preview: string }[] = [
  {
    id: "modern",
    label: "Modern",
    description: "Clean geometry, high contrast, bold type. Tech-forward brands.",
    preview: "rounded-xl shadow-lg",
  },
  {
    id: "brutalist",
    label: "Brutalist",
    description: "Raw, blunt, intentionally stark. Thick borders, flat color.",
    preview: "rounded-none border-4 border-black dark:border-white",
  },
  {
    id: "minimalist",
    label: "Minimalist",
    description: "Whitespace-first, quiet palette, restrained typography.",
    preview: "rounded-sm shadow-none border border-gray-200 dark:border-gray-700",
  },
  {
    id: "sophisticated",
    label: "Sophisticated",
    description: "Refined palette, rich hues, elegant serif or refined sans.",
    preview: "rounded-2xl shadow-xl border border-purple-100 dark:border-purple-900",
  },
  {
    id: "contemporary",
    label: "Contemporary",
    description: "Organic shapes, warm tones, inclusive feel.",
    preview: "rounded-3xl shadow-md border border-emerald-100 dark:border-emerald-900",
  },
  {
    id: "traditional",
    label: "Traditional",
    description: "Classic proportions, muted palette, timeless authority.",
    preview: "rounded-lg shadow border border-amber-200 dark:border-amber-800",
  },
];

const templateAccent: Record<StyleTemplate, string> = {
  modern: "bg-blue-600",
  brutalist: "bg-yellow-400",
  minimalist: "bg-gray-400",
  sophisticated: "bg-purple-600",
  contemporary: "bg-emerald-500",
  traditional: "bg-amber-700",
};

const DEFAULT_COLORS: Record<StyleTemplate, string[]> = {
  modern: ["#2563eb", "#1e40af", "#93c5fd", "#1e293b", "#f1f5f9"],
  brutalist: ["#facc15", "#1c1917", "#dc2626", "#ffffff", "#a3a3a3"],
  minimalist: ["#404040", "#a3a3a3", "#e5e5e5", "#fafafa", "#171717"],
  sophisticated: ["#7c3aed", "#4c1d95", "#ddd6fe", "#1a0533", "#fdf4ff"],
  contemporary: ["#10b981", "#065f46", "#a7f3d0", "#fff7ed", "#1a2e2a"],
  traditional: ["#b45309", "#78350f", "#fde68a", "#1c1612", "#f5f0e8"],
};

type Step = 1 | 2 | 3;

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
      setUploadError("Couldn't extract colors. Try a different image.");
    } finally {
      setExtracting(false);
    }
  }, []);

  function handleCreate() {
    if (!template || !name.trim()) return;
    const finalColors = colors.length > 0 ? colors : DEFAULT_COLORS[template];
    const system = createSystem(name.trim(), template, finalColors);
    router.push(`/dashboard/systems/${system.id}/tokens`);
  }

  const canGoToStep2 = name.trim().length > 0 && template !== null;
  const canCreate = canGoToStep2;

  return (
    <div className="p-8 max-w-3xl mx-auto font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => step === 1 ? router.push("/dashboard") : setStep((s) => (s - 1) as Step)}
          className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-4 flex items-center gap-1 transition-colors"
        >
          ← {step === 1 ? "Back to overview" : "Back"}
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">New design system</h1>

        {/* Steps indicator */}
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
              <span className={`text-sm ${s === step ? "text-gray-900 dark:text-gray-100 font-medium" : "text-gray-400 dark:text-gray-500"}`}>
                {s === 1 ? "Name & style" : s === 2 ? "Brand colors" : "Review"}
              </span>
              {s < 3 && <span className="text-gray-200 dark:text-gray-700 text-sm">›</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Name + Template */}
      {step === 1 && (
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Design system name
            </label>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Acme Brand, Internal Tools, Consumer App"
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Choose a style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`flex flex-col items-start gap-2 p-4 rounded-xl border text-left transition-all ${
                    template === t.id
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950 ring-1 ring-indigo-400"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className={`w-3 h-3 rounded-full ${templateAccent[t.id]}`} />
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{t.label}</span>
                    {template === t.id && <span className="ml-auto text-indigo-600 dark:text-indigo-400 text-xs">✓</span>}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">{t.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setStep(2)}
              disabled={!canGoToStep2}
              className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Brand colors via upload */}
      {step === 2 && (
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Upload your company logo or a brand screenshot — we&apos;ll extract the dominant colors automatically.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">You can skip this and use template defaults.</p>
          </div>

          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="relative flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-10 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors bg-gray-50 dark:bg-gray-900 cursor-pointer"
          >
            {previewSrc ? (
              <img src={previewSrc} alt="Uploaded" className="max-h-28 max-w-full object-contain rounded-lg" />
            ) : (
              <>
                <span className="text-3xl">⬆</span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Click to upload logo or screenshot</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG, SVG, WebP</span>
              </>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </button>

          {extracting && (
            <p className="text-sm text-indigo-600 dark:text-indigo-400 text-center">Extracting colors…</p>
          )}
          {uploadError && (
            <p className="text-sm text-red-600 dark:text-red-400">{uploadError}</p>
          )}

          {colors.length > 0 && !extracting && (
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Extracted brand colors</p>
              <div className="flex gap-3 flex-wrap">
                {colors.map((c) => (
                  <div key={c} className="flex flex-col items-center gap-1">
                    <div
                      className="w-10 h-10 rounded-xl border border-white dark:border-gray-700 shadow"
                      style={{ backgroundColor: c }}
                    />
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {colors.length === 0 && !extracting && template && (
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Template defaults <span className="font-normal text-gray-400 dark:text-gray-500">(will be used if you skip)</span>
              </p>
              <div className="flex gap-3 flex-wrap">
                {DEFAULT_COLORS[template].map((c) => (
                  <div key={c} className="flex flex-col items-center gap-1">
                    <div
                      className="w-10 h-10 rounded-xl border border-white dark:border-gray-700 shadow"
                      style={{ backgroundColor: c }}
                    />
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
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
      )}

      {/* Step 3: Review */}
      {step === 3 && template && (
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${templateAccent[template]}`} />
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold mb-0.5">Design system name</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{name}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold mb-1.5">Style</p>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{template}</span>
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold mb-2">Brand colors</p>
              <div className="flex gap-2 flex-wrap">
                {(colors.length > 0 ? colors : DEFAULT_COLORS[template]).map((c) => (
                  <div
                    key={c}
                    className="w-8 h-8 rounded-lg border border-white dark:border-gray-700 shadow-sm"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            You can customize tokens and components after creation.
          </p>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setStep(2)}
              className="text-sm text-gray-500 dark:text-gray-400 px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleCreate}
              disabled={!canCreate}
              className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-500 transition-colors disabled:opacity-40"
            >
              Create design system
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
