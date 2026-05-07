"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useDesignSystems, type DesignSystem } from "@/lib/design-systems";
import { TEMPLATE_STYLES, ALL_TEMPLATES, type StyleTemplate } from "@/lib/templates";

// ─── Mini template picker used in the edit modal ────────────────────────────

function TemplatePicker({
  value,
  onChange,
}: {
  value: StyleTemplate;
  onChange: (t: StyleTemplate) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {ALL_TEMPLATES.map((t) => {
        const s = TEMPLATE_STYLES[t];
        const accent = s.defaultColors[0];
        const selected = value === t;
        return (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
              selected
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950 ring-1 ring-indigo-400"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <div className="flex items-center gap-2 w-full mb-1.5">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: accent }}
              />
              {selected && (
                <span className="ml-auto text-indigo-600 dark:text-indigo-400 text-xs">✓</span>
              )}
            </div>
            {/* Tiny button preview */}
            <span
              className="text-[10px] mb-1.5 px-2 py-0.5 leading-tight"
              style={{
                fontFamily: s.fontFamily,
                fontWeight: s.bodyWeight,
                borderRadius: s.buttonRadius,
                border: `${s.borderWidth} solid ${accent}`,
                color: accent,
                textTransform: s.textTransform,
                letterSpacing: s.letterSpacing,
                display: "inline-block",
              }}
            >
              {s.textTransform === "uppercase" ? "BUTTON" : "Button"}
            </span>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {s.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Edit modal ─────────────────────────────────────────────────────────────

function EditModal({
  system,
  onSave,
  onClose,
}: {
  system: DesignSystem;
  onSave: (name: string, template: StyleTemplate) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(system.name);
  const [template, setTemplate] = useState<StyleTemplate>(system.template);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-5">Edit design system</h2>
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Style</label>
            <TemplatePicker value={template} onChange={setTemplate} />
          </div>
        </div>
        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { if (name.trim()) { onSave(name.trim(), template); onClose(); } }}
            disabled={!name.trim()}
            className="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-500 transition-colors disabled:opacity-40"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── System card ─────────────────────────────────────────────────────────────

function SystemCard({
  system,
  onEdit,
  onDuplicate,
  onTrash,
}: {
  system: DesignSystem;
  onEdit: () => void;
  onDuplicate: () => void;
  onTrash: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const s = TEMPLATE_STYLES[system.template];
  const stripeColor = system.brandColors[0] ?? s.defaultColors[0];

  return (
    <div className="relative group">
      <Link
        href={`/dashboard/systems/${system.id}/tokens`}
        className="flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
      >
        {/* Colour stripe using actual brand colour */}
        <div style={{ backgroundColor: stripeColor, height: "4px" }} />
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate pr-6">
              {system.name}
            </h3>
            <span
              className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border"
              style={{
                fontFamily: s.fontFamily,
                borderRadius: s.buttonRadius,
                color: stripeColor,
                borderColor: stripeColor + "55",
                backgroundColor: stripeColor + "18",
                letterSpacing: s.letterSpacing,
                textTransform: s.textTransform,
              }}
            >
              {s.textTransform === "uppercase" ? s.label.toUpperCase() : s.label}
            </span>
          </div>
          {system.brandColors.length > 0 && (
            <div className="flex gap-1.5 mb-3">
              {system.brandColors.slice(0, 5).map((color) => (
                <div
                  key={color}
                  className="w-5 h-5 rounded-full border-2 border-white dark:border-gray-900 shadow-sm"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          )}
          {/* Mini component preview */}
          <div
            className="mt-3 p-3 bg-gray-50 rounded-lg flex items-center gap-2 overflow-hidden"
            style={{ borderRadius: s.cardRadius }}
          >
            <span
              className="text-[10px] px-2 py-1 leading-tight shrink-0"
              style={{
                fontFamily: s.fontFamily,
                fontWeight: s.bodyWeight,
                backgroundColor: stripeColor,
                color: "#fff",
                borderRadius: s.buttonRadius,
                boxShadow: s.buttonShadow,
                textTransform: s.textTransform,
                letterSpacing: s.letterSpacing,
              }}
            >
              {s.textTransform === "uppercase" ? "BTN" : "Btn"}
            </span>
            <span
              className="text-[10px] truncate"
              style={{
                fontFamily: s.fontFamily,
                fontWeight: s.headingWeight,
                letterSpacing: s.letterSpacing,
                textTransform: s.textTransform,
                color: "#374151",
              }}
            >
              {s.textTransform === "uppercase" ? "COMPONENT" : "Component"}
            </span>
            <span
              className="text-[10px] px-1.5 py-0.5 ml-auto shrink-0"
              style={{
                fontFamily: s.fontFamily,
                borderRadius: s.buttonRadius,
                border: `${s.borderWidth} solid #e5e7eb`,
                color: "#9ca3af",
                boxShadow: s.shadow,
              }}
            >
              Card
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
            Updated {new Date(system.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </Link>

      {/* 3-dot menu */}
      <div className="absolute top-6 right-4 z-10">
        <button
          onClick={(e) => { e.preventDefault(); setMenuOpen(!menuOpen); }}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 transition-all text-base leading-none"
          title="Actions"
        >
          ···
        </button>
        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-8 z-20 w-36 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl py-1 overflow-hidden">
              <button
                onClick={(e) => { e.preventDefault(); setMenuOpen(false); onEdit(); }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={(e) => { e.preventDefault(); setMenuOpen(false); onDuplicate(); }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Duplicate
              </button>
              <div className="my-1 border-t border-gray-100 dark:border-gray-800" />
              <button
                onClick={(e) => { e.preventDefault(); setMenuOpen(false); onTrash(); }}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Trash section ───────────────────────────────────────────────────────────

function TrashSection({
  items,
  onRestore,
  onDelete,
}: {
  items: DesignSystem[];
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  if (items.length === 0) return null;

  return (
    <div className="mt-12">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mb-4"
      >
        <span>{expanded ? "▾" : "▸"}</span>
        Trash ({items.length})
      </button>
      {expanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((system) => (
            <div
              key={system.id}
              className="flex items-center justify-between gap-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 px-4 py-3 opacity-60"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: system.brandColors[0] ?? TEMPLATE_STYLES[system.template].defaultColors[0] }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{system.name}</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => onRestore(system.id)}
                  className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Restore
                </button>
                <button
                  onClick={() => onDelete(system.id)}
                  className="text-xs font-medium text-red-500 dark:text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-3xl mb-5">⬡</div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">No design systems yet</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
        Create your first design system to define your brand&apos;s colours, typography, and components.
      </p>
      <Link
        href="/dashboard/new"
        className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-500 transition-colors"
      >
        + Create design system
      </Link>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user } = useAuth();
  const { systems, isLoading, updateSystem, duplicateSystem, trashSystem, restoreSystem, permanentDeleteSystem } =
    useDesignSystems();

  const [editingSystem, setEditingSystem] = useState<DesignSystem | null>(null);

  const active = systems.filter((s) => !s.trashedAt);
  const trashed = systems.filter((s) => s.trashedAt);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Welcome back, {user?.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Your design systems</p>
        </div>
        {active.length > 0 && (
          <Link
            href="/dashboard/new"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-indigo-500 transition-colors text-sm shrink-0"
          >
            + New system
          </Link>
        )}
      </div>

      {isLoading ? null : active.length === 0 && trashed.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {active.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">All systems are in the trash.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {active.map((s) => (
                <SystemCard
                  key={s.id}
                  system={s}
                  onEdit={() => setEditingSystem(s)}
                  onDuplicate={() => duplicateSystem(s.id)}
                  onTrash={() => trashSystem(s.id)}
                />
              ))}
            </div>
          )}
          <TrashSection
            items={trashed}
            onRestore={restoreSystem}
            onDelete={permanentDeleteSystem}
          />
        </>
      )}

      {editingSystem && (
        <EditModal
          system={editingSystem}
          onSave={(name, template) => {
            updateSystem(editingSystem.id, { name, template });
            setEditingSystem(null);
          }}
          onClose={() => setEditingSystem(null)}
        />
      )}
    </div>
  );
}
