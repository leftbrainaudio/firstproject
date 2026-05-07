"use client";

import { useAuth } from "@/lib/auth";
import { useTheme } from "@designbase/components";

export default function SettingsPage() {
  const { user } = useAuth();
  const { resolvedTheme, setTheme, theme } = useTheme();

  return (
    <div className="p-8 max-w-2xl mx-auto font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">Settings</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Manage your account and preferences.</p>

      <div className="flex flex-col gap-6">
        {/* Profile */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Profile</h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-lg font-bold uppercase">
              {user?.name[0]}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Appearance</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Choose your preferred theme.</p>
          <div className="flex gap-3">
            {(["light", "dark", "system"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors capitalize ${
                  theme === t
                    ? "bg-indigo-50 dark:bg-indigo-950 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                {t === "light" ? "☀ Light" : t === "dark" ? "☾ Dark" : "⚙ System"}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
            Currently: <span className="font-medium">{resolvedTheme}</span>
          </p>
        </section>

        {/* Workspace */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Workspace</h2>
          <div className="flex flex-col gap-3 text-sm">
            {[
              { label: "Plan", value: "Free" },
              { label: "Token collections", value: "3 / 5" },
              { label: "Team members", value: "5 / 5" },
            ].map((row, i, arr) => (
              <div key={row.label} className={`flex justify-between items-center py-2 ${i < arr.length - 1 ? "border-b border-gray-50 dark:border-gray-800" : ""}`}>
                <span className="text-gray-600 dark:text-gray-400">{row.label}</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{row.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
