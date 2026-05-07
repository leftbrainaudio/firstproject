"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useDesignSystems, type DesignSystem, type StyleTemplate } from "@/lib/design-systems";

const templateColors: Record<StyleTemplate, string> = {
  modern: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
  brutalist: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800",
  minimalist: "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700",
  sophisticated: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800",
  contemporary: "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800",
  traditional: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800",
};

const templateLabel: Record<StyleTemplate, string> = {
  modern: "Modern",
  brutalist: "Brutalist",
  minimalist: "Minimalist",
  sophisticated: "Sophisticated",
  contemporary: "Contemporary",
  traditional: "Traditional",
};

function SystemCard({ system }: { system: DesignSystem }) {
  return (
    <Link
      href={`/dashboard/systems/${system.id}/tokens`}
      className="group flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
    >
      <div className={`h-2 w-full ${templateColors[system.template]}`} />
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
            {system.name}
          </h3>
          <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${templateColors[system.template]}`}>
            {templateLabel[system.template]}
          </span>
        </div>
        {system.brandColors.length > 0 && (
          <div className="flex gap-1.5 mb-3">
            {system.brandColors.slice(0, 5).map((color) => (
              <div
                key={color}
                className="w-5 h-5 rounded-full border border-white dark:border-gray-800 shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Created {new Date(system.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-3xl mb-5">
        ⬡
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">No design systems yet</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
        Create your first design system to define your brand&apos;s colors, typography, and components.
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

export default function DashboardPage() {
  const { user } = useAuth();
  const { systems, isLoading } = useDesignSystems();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Your design systems</p>
        </div>
        {systems.length > 0 && (
          <Link
            href="/dashboard/new"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-indigo-500 transition-colors text-sm shrink-0"
          >
            + New system
          </Link>
        )}
      </div>

      {isLoading ? null : systems.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {systems.map((s) => (
            <SystemCard key={s.id} system={s} />
          ))}
        </div>
      )}
    </div>
  );
}
