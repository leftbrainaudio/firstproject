"use client";

import { useAuth } from "@/lib/auth";
import { useTheme } from "@designbase/components";

export default function SettingsPage() {
  const { user } = useAuth();
  const { resolvedTheme, setTheme, theme } = useTheme();

  return (
    <div className="p-8 max-w-2xl mx-auto font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
      <p className="text-gray-500 mb-8">Manage your account and preferences.</p>

      <div className="flex flex-col gap-6">
        {/* Profile */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Profile</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg font-bold uppercase">
              {user?.name[0]}
            </div>
            <div>
              <p className="font-medium text-gray-900">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Appearance</h2>
          <p className="text-sm text-gray-500 mb-3">Choose your preferred theme.</p>
          <div className="flex gap-3">
            {(["light", "dark", "system"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors capitalize ${
                  theme === t
                    ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                {t === "light" ? "☀ Light" : t === "dark" ? "☾ Dark" : "⚙ System"}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Currently: <span className="font-medium">{resolvedTheme}</span>
          </p>
        </section>

        {/* Workspace */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Workspace</h2>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-600">Plan</span>
              <span className="font-medium text-gray-900">Free</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-600">Token collections</span>
              <span className="font-medium text-gray-900">3 / 5</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Team members</span>
              <span className="font-medium text-gray-900">5 / 5</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
