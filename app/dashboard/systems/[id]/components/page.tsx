"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useDesignSystems } from "@/lib/design-systems";

export default function SystemComponentsPage() {
  const { id } = useParams<{ id: string }>();
  const { systems } = useDesignSystems();
  const system = systems.find((s) => s.id === id);

  return (
    <div className="p-8 max-w-4xl mx-auto font-[family-name:var(--font-geist-sans)]">
      <div className="mb-6">
        <Link href="/dashboard" className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
          ← All systems
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-1">
        {system?.name ?? "Design System"}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 capitalize">
        {system?.template} style · Components
      </p>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl mb-4">⬡</div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Components coming soon</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
          Per-system component library editing is on the roadmap. For now, explore the shared component showcase.
        </p>
        <Link
          href="/dashboard/components"
          className="mt-5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          View component showcase →
        </Link>
      </div>
    </div>
  );
}
