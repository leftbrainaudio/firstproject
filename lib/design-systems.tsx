"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { StyleTemplate } from "./templates";

export type { StyleTemplate } from "./templates";

export interface DesignSystem {
  id: string;
  name: string;
  template: StyleTemplate;
  brandColors: string[];
  createdAt: string;
  updatedAt: string;
  trashedAt?: string;
}

interface DesignSystemsContextValue {
  systems: DesignSystem[];
  isLoading: boolean;
  createSystem: (name: string, template: StyleTemplate, brandColors: string[]) => DesignSystem;
  updateSystem: (id: string, updates: Partial<Pick<DesignSystem, "name" | "template" | "brandColors">>) => void;
  duplicateSystem: (id: string) => void;
  trashSystem: (id: string) => void;
  restoreSystem: (id: string) => void;
  permanentDeleteSystem: (id: string) => void;
}

const DesignSystemsContext = createContext<DesignSystemsContextValue | null>(null);

const STORAGE_KEY = "ds_design_systems";

export function DesignSystemsProvider({ children }: { children: React.ReactNode }) {
  const [systems, setSystems] = useState<DesignSystem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setSystems(JSON.parse(stored)); } catch {}
    }
    setIsLoading(false);
  }, []);

  function persist(next: DesignSystem[]) {
    setSystems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function createSystem(name: string, template: StyleTemplate, brandColors: string[]): DesignSystem {
    const now = new Date().toISOString();
    const system: DesignSystem = {
      id: `ds_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name,
      template,
      brandColors,
      createdAt: now,
      updatedAt: now,
    };
    persist([...systems, system]);
    return system;
  }

  function updateSystem(id: string, updates: Partial<Pick<DesignSystem, "name" | "template" | "brandColors">>) {
    persist(
      systems.map((s) =>
        s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
      )
    );
  }

  function duplicateSystem(id: string) {
    const source = systems.find((s) => s.id === id);
    if (!source) return;
    const now = new Date().toISOString();
    const copy: DesignSystem = {
      ...source,
      id: `ds_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: `${source.name} (copy)`,
      createdAt: now,
      updatedAt: now,
      trashedAt: undefined,
    };
    const idx = systems.findIndex((s) => s.id === id);
    const next = [...systems];
    next.splice(idx + 1, 0, copy);
    persist(next);
  }

  function trashSystem(id: string) {
    persist(
      systems.map((s) =>
        s.id === id ? { ...s, trashedAt: new Date().toISOString() } : s
      )
    );
  }

  function restoreSystem(id: string) {
    persist(
      systems.map((s) => {
        if (s.id !== id) return s;
        const { trashedAt: _, ...rest } = s;
        return rest;
      })
    );
  }

  function permanentDeleteSystem(id: string) {
    persist(systems.filter((s) => s.id !== id));
  }

  return (
    <DesignSystemsContext.Provider
      value={{ systems, isLoading, createSystem, updateSystem, duplicateSystem, trashSystem, restoreSystem, permanentDeleteSystem }}
    >
      {children}
    </DesignSystemsContext.Provider>
  );
}

export function useDesignSystems() {
  const ctx = useContext(DesignSystemsContext);
  if (!ctx) throw new Error("useDesignSystems must be used within DesignSystemsProvider");
  return ctx;
}
