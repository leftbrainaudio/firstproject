"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type StyleTemplate = "modern" | "brutalist" | "minimalist" | "sophisticated" | "contemporary" | "traditional";

export interface DesignSystem {
  id: string;
  name: string;
  template: StyleTemplate;
  brandColors: string[];
  createdAt: string;
  updatedAt: string;
}

interface DesignSystemsContextValue {
  systems: DesignSystem[];
  isLoading: boolean;
  createSystem: (name: string, template: StyleTemplate, brandColors: string[]) => DesignSystem;
  deleteSystem: (id: string) => void;
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

  function deleteSystem(id: string) {
    persist(systems.filter((s) => s.id !== id));
  }

  return (
    <DesignSystemsContext.Provider value={{ systems, isLoading, createSystem, deleteSystem }}>
      {children}
    </DesignSystemsContext.Provider>
  );
}

export function useDesignSystems() {
  const ctx = useContext(DesignSystemsContext);
  if (!ctx) throw new Error("useDesignSystems must be used within DesignSystemsProvider");
  return ctx;
}
