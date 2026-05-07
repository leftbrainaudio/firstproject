"use client";

import { useState } from "react";

type TokenType = "color" | "typography" | "spacing";
type ActiveTab = "all" | TokenType;

interface Token {
  id: string;
  name: string;
  value: string;
  description?: string;
}

type TokenRow = Token & { type: TokenType };

const initialTokens: Record<TokenType, Token[]> = {
  color: [
    { id: "c1", name: "brand/primary", value: "#6366f1", description: "Primary brand color" },
    { id: "c2", name: "brand/secondary", value: "#8b5cf6", description: "Secondary accent" },
    { id: "c3", name: "neutral/900", value: "#111827", description: "Darkest text" },
    { id: "c4", name: "neutral/500", value: "#6b7280", description: "Muted text" },
    { id: "c5", name: "neutral/100", value: "#f3f4f6", description: "Surface background" },
    { id: "c6", name: "semantic/success", value: "#10b981", description: "Success state" },
    { id: "c7", name: "semantic/error", value: "#ef4444", description: "Error state" },
    { id: "c8", name: "semantic/warning", value: "#f59e0b", description: "Warning state" },
  ],
  typography: [
    { id: "t1", name: "font/family/sans", value: "Inter, system-ui, sans-serif" },
    { id: "t2", name: "font/family/mono", value: "JetBrains Mono, monospace" },
    { id: "t3", name: "font/size/xs", value: "12px" },
    { id: "t4", name: "font/size/sm", value: "14px" },
    { id: "t5", name: "font/size/base", value: "16px" },
    { id: "t6", name: "font/size/lg", value: "18px" },
    { id: "t7", name: "font/size/xl", value: "20px" },
    { id: "t8", name: "font/size/2xl", value: "24px" },
    { id: "t9", name: "font/weight/regular", value: "400" },
    { id: "t10", name: "font/weight/semibold", value: "600" },
    { id: "t11", name: "font/weight/bold", value: "700" },
  ],
  spacing: [
    { id: "s1", name: "spacing/1", value: "4px" },
    { id: "s2", name: "spacing/2", value: "8px" },
    { id: "s3", name: "spacing/3", value: "12px" },
    { id: "s4", name: "spacing/4", value: "16px" },
    { id: "s5", name: "spacing/6", value: "24px" },
    { id: "s6", name: "spacing/8", value: "32px" },
    { id: "s7", name: "spacing/12", value: "48px" },
    { id: "s8", name: "spacing/16", value: "64px" },
  ],
};

const tabLabels: { key: ActiveTab; label: string; icon: string }[] = [
  { key: "all",        label: "All",        icon: "☰"  },
  { key: "color",      label: "Colors",     icon: "🎨" },
  { key: "typography", label: "Typography", icon: "Aa" },
  { key: "spacing",    label: "Spacing",    icon: "↔"  },
];

const typeBadge: Record<TokenType, { label: string; cls: string }> = {
  color:      { label: "Color",      cls: "bg-indigo-50 text-indigo-700" },
  typography: { label: "Typography", cls: "bg-purple-50 text-purple-700" },
  spacing:    { label: "Spacing",    cls: "bg-teal-50 text-teal-700"     },
};

function isHexColor(val: string) {
  return /^#[0-9a-fA-F]{3,8}$/.test(val);
}

export default function TokensPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [tokens, setTokens] = useState(initialTokens);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<Token>>({});
  const [adding, setAdding] = useState(false);
  const [newToken, setNewToken] = useState<Partial<Token>>({});
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(false);

  function tokenTypeById(id: string): TokenType {
    for (const type of ["color", "typography", "spacing"] as TokenType[]) {
      if (tokens[type].some((t) => t.id === id)) return type;
    }
    return "color";
  }

  const allRows: TokenRow[] = (["color", "typography", "spacing"] as TokenType[]).flatMap(
    (type) => tokens[type].map((t) => ({ ...t, type }))
  );

  const sourceList: TokenRow[] =
    activeTab === "all"
      ? allRows
      : tokens[activeTab].map((t) => ({ ...t, type: activeTab }));

  const filtered = sourceList.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.value.toLowerCase().includes(search.toLowerCase())
  );

  function startEdit(token: Token) {
    setEditing(token.id);
    setDraft({ ...token });
  }

  function saveEdit() {
    if (!editing) return;
    const type = tokenTypeById(editing);
    setTokens((prev) => ({
      ...prev,
      [type]: prev[type].map((t) => (t.id === editing ? { ...t, ...draft } : t)),
    }));
    setEditing(null);
    setDraft({});
  }

  function deleteToken(id: string) {
    const type = tokenTypeById(id);
    setTokens((prev) => ({
      ...prev,
      [type]: prev[type].filter((t) => t.id !== id),
    }));
  }

  function addToken() {
    if (!newToken.name || !newToken.value || activeTab === "all") return;
    const token: Token = {
      id: `${activeTab[0]}${Date.now()}`,
      name: newToken.name,
      value: newToken.value,
      description: newToken.description,
    };
    setTokens((prev) => ({ ...prev, [activeTab]: [...prev[activeTab], token] }));
    setNewToken({});
    setAdding(false);
  }

  function handleExport() {
    const css = Object.entries(tokens)
      .flatMap(([, list]) => list.map((t) => `  --${t.name.replace(/\//g, "-")}: ${t.value};`))
      .join("\n");
    const blob = new Blob([`:root {\n${css}\n}`], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tokens.css";
    a.click();
    URL.revokeObjectURL(url);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const totalCount = activeTab === "all"
    ? allRows.length
    : tokens[activeTab].length;

  return (
    <div className="p-8 max-w-4xl mx-auto font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Design Tokens</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your system&apos;s visual primitives</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-500 transition-colors"
        >
          {saved ? "✓ Exported!" : "📦 Export CSS"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-6">
        {tabLabels.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setSearch(""); setAdding(false); setEditing(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* Search + Add */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tokens..."
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        {activeTab !== "all" && (
          <button
            onClick={() => setAdding(true)}
            className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors"
          >
            + Add token
          </button>
        )}
      </div>

      {/* Add Token Form */}
      {adding && activeTab !== "all" && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 mb-4 flex flex-col gap-3">
          <p className="text-sm font-semibold text-indigo-800">New token</p>
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Name (e.g. brand/accent)"
              value={newToken.name ?? ""}
              onChange={(e) => setNewToken((p) => ({ ...p, name: e.target.value }))}
              className="border border-indigo-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              placeholder="Value (e.g. #ff5500)"
              value={newToken.value ?? ""}
              onChange={(e) => setNewToken((p) => ({ ...p, value: e.target.value }))}
              className="border border-indigo-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              placeholder="Description (optional)"
              value={newToken.description ?? ""}
              onChange={(e) => setNewToken((p) => ({ ...p, description: e.target.value }))}
              className="col-span-2 border border-indigo-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={addToken} className="px-4 py-1.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-500">
              Add
            </button>
            <button onClick={() => { setAdding(false); setNewToken({}); }} className="px-4 py-1.5 text-gray-600 text-sm rounded-lg hover:bg-gray-100">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Token Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">No tokens found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                {activeTab === "all" && <th className="text-left px-5 py-3">Type</th>}
                <th className="text-left px-5 py-3">Name</th>
                <th className="text-left px-5 py-3">Value</th>
                <th className="text-left px-5 py-3 hidden sm:table-cell">Description</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((token, i) => (
                <tr
                  key={token.id}
                  className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${i === filtered.length - 1 ? "border-b-0" : ""}`}
                >
                  {editing === token.id ? (
                    <>
                      {activeTab === "all" && (
                        <td className="px-5 py-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${typeBadge[token.type].cls}`}>
                            {typeBadge[token.type].label}
                          </span>
                        </td>
                      )}
                      <td className="px-5 py-3">
                        <input
                          value={draft.name ?? ""}
                          onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
                          className="w-full border border-indigo-300 rounded-lg px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                        />
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          {isHexColor(draft.value ?? "") && (
                            <input
                              type="color"
                              value={draft.value ?? "#000000"}
                              onChange={(e) => setDraft((p) => ({ ...p, value: e.target.value }))}
                              className="w-7 h-7 rounded cursor-pointer border-0"
                            />
                          )}
                          <input
                            value={draft.value ?? ""}
                            onChange={(e) => setDraft((p) => ({ ...p, value: e.target.value }))}
                            className="flex-1 border border-indigo-300 rounded-lg px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                          />
                        </div>
                      </td>
                      <td className="px-5 py-3 hidden sm:table-cell">
                        <input
                          value={draft.description ?? ""}
                          onChange={(e) => setDraft((p) => ({ ...p, description: e.target.value }))}
                          placeholder="Description"
                          className="w-full border border-indigo-300 rounded-lg px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2 justify-end">
                          <button onClick={saveEdit} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">Save</button>
                          <button onClick={() => setEditing(null)} className="text-xs text-gray-400 hover:text-gray-600">Cancel</button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      {activeTab === "all" && (
                        <td className="px-5 py-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${typeBadge[token.type].cls}`}>
                            {typeBadge[token.type].label}
                          </span>
                        </td>
                      )}
                      <td className="px-5 py-3 font-mono text-gray-700">{token.name}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          {isHexColor(token.value) && (
                            <span
                              className="w-5 h-5 rounded-md border border-gray-200 shrink-0"
                              style={{ backgroundColor: token.value }}
                            />
                          )}
                          <span className="font-mono text-gray-700">{token.value}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-gray-400 hidden sm:table-cell">{token.description ?? "—"}</td>
                      <td className="px-5 py-3">
                        <div className="flex gap-3 justify-end">
                          <button onClick={() => startEdit(token)} className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">Edit</button>
                          <button onClick={() => deleteToken(token.id)} className="text-xs text-gray-400 hover:text-red-500 transition-colors">Delete</button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-3 text-right">
        {filtered.length !== totalCount
          ? `${filtered.length} of ${totalCount}`
          : totalCount} token{totalCount !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
