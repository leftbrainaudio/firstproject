"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";

const stats = [
  { label: "Token Collections", value: "3", change: "+1 this week" },
  { label: "Total Tokens", value: "142", change: "+12 this week" },
  { label: "Components", value: "28", change: "+3 this week" },
  { label: "Team Members", value: "5", change: "No change" },
];

const recentActivity = [
  { user: "You", action: "updated color token", target: "brand/primary", time: "2 min ago" },
  { user: "Sarah", action: "added spacing token", target: "spacing/lg", time: "1 hr ago" },
  { user: "Marcus", action: "published component", target: "Button/Primary", time: "3 hrs ago" },
  { user: "You", action: "created token collection", target: "Dark Theme", time: "Yesterday" },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          Good morning, {user?.name} 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Here&apos;s what&apos;s happening with your design system.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{s.label}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">{s.value}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{s.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick actions</h2>
          <div className="flex flex-col gap-2">
            <Link
              href="/dashboard/tokens"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
            >
              <span>◈</span> Edit tokens
            </Link>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <span>⬡</span> Add component
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <span>📦</span> Export tokens
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <span>👥</span> Invite teammate
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent activity</h2>
          <div className="flex flex-col gap-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold uppercase shrink-0">
                  {a.user[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">{a.user}</span> {a.action}{" "}
                    <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-400">{a.target}</span>
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
