"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@designbase/components";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: "▦" },
  { label: "Tokens", href: "/dashboard/tokens", icon: "◈" },
  { label: "Components", href: "/dashboard/components", icon: "⬡" },
  { label: "Documentation", href: "/dashboard/docs", icon: "☰" },
  { label: "Settings", href: "/dashboard/settings", icon: "⚙" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
  }, [isLoading, user, router]);

  if (!isLoading && !user) return null;

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950 font-[family-name:var(--font-geist-sans)]">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 py-6">
        <div className="px-6 mb-8">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-50">Ergo, Design</span>
        </div>
        <nav className="flex flex-col gap-1 px-3 flex-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 pt-4 border-t border-gray-100 dark:border-gray-800 mt-4">
          {user && (
            <>
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold uppercase">
                  {user.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="w-full text-left px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors mt-1"
              >
                {resolvedTheme === "dark" ? "☀ Light mode" : "☾ Dark mode"}
              </button>
              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Sign out
              </button>
            </>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {isLoading ? null : children}
      </main>
    </div>
  );
}
