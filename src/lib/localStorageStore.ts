"use client";

type Listener = () => void;

const listenersByKey = new Map<string, Set<Listener>>();

function getListeners(key: string): Set<Listener> {
  let set = listenersByKey.get(key);
  if (!set) {
    set = new Set();
    listenersByKey.set(key, set);
  }
  return set;
}

export function getLocalStorageRaw(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeLocalStorageRaw(key: string, raw: string): void {
  try {
    window.localStorage.setItem(key, raw);
  } catch {
    // storage unavailable — ignore
  }
  getListeners(key).forEach((listener) => listener());
}

export function subscribeLocalStorageKey(key: string) {
  return (callback: Listener) => {
    const set = getListeners(key);
    set.add(callback);
    return () => set.delete(callback);
  };
}
