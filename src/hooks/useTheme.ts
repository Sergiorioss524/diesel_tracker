"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { ThemeMode } from "@/lib/types";
import {
  getLocalStorageRaw,
  subscribeLocalStorageKey,
  writeLocalStorageRaw,
} from "@/lib/localStorageStore";

const THEME_KEY = "dieselCalc.theme";
const subscribe = subscribeLocalStorageKey(THEME_KEY);

function getSnapshot(): ThemeMode {
  const raw = getLocalStorageRaw(THEME_KEY);
  return raw === "light" || raw === "dark" ? raw : "system";
}

function getServerSnapshot(): ThemeMode {
  return "system";
}

export function useTheme() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "light") root.setAttribute("data-theme", "light");
    else if (mode === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
  }, [mode]);

  const toggle = useCallback(() => {
    const next: ThemeMode = mode === "system" ? "dark" : mode === "dark" ? "light" : "system";
    writeLocalStorageRaw(THEME_KEY, next);
  }, [mode]);

  const label = mode === "light" ? "Claro" : mode === "dark" ? "Oscuro" : "Tema del sistema";

  return { mode, toggle, label };
}
