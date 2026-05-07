"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function SignupPage() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try { await signup(name, email, password); }
    catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4 font-[family-name:var(--font-geist-sans)]">
      <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-8">Ergo, Design</Link>
      <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-1">Create your account</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Free forever for small teams</p>
        {error && <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400 rounded-lg px-3 py-2 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            { label: "Full name", type: "text", value: name, set: setName, placeholder: "Chris Killoran" },
            { label: "Email", type: "email", value: email, set: setEmail, placeholder: "you@company.com" },
            { label: "Password", type: "password", value: password, set: setPassword, placeholder: "Min. 6 characters" },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{field.label}</label>
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                placeholder={field.placeholder}
                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-500 transition-colors disabled:opacity-50 mt-1"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
