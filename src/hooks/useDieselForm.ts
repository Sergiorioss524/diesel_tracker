"use client";

import { useCallback, useSyncExternalStore } from "react";
import { DEFAULT_FORM_STATE, DieselFormState } from "@/lib/types";
import {
  getLocalStorageRaw,
  subscribeLocalStorageKey,
  writeLocalStorageRaw,
} from "@/lib/localStorageStore";

const STORE_KEY = "dieselCalc.v1";
const subscribe = subscribeLocalStorageKey(STORE_KEY);

let cache: { raw: string | null; value: DieselFormState } | null = null;

function computeSnapshot(): DieselFormState {
  const raw = getLocalStorageRaw(STORE_KEY);
  if (cache && cache.raw === raw) return cache.value;

  let value = DEFAULT_FORM_STATE;
  if (raw) {
    try {
      const saved = JSON.parse(raw) as Partial<Record<keyof DieselFormState, string>>;
      const next = { ...DEFAULT_FORM_STATE };
      (Object.keys(next) as (keyof DieselFormState)[]).forEach((key) => {
        const fieldValue = saved[key];
        if (fieldValue !== undefined && fieldValue !== "") {
          (next[key] as string) = fieldValue;
        }
      });
      value = next;
    } catch {
      value = DEFAULT_FORM_STATE;
    }
  }
  cache = { raw, value };
  return value;
}

function getServerSnapshot(): DieselFormState {
  return DEFAULT_FORM_STATE;
}

export function useDieselForm() {
  const form = useSyncExternalStore(subscribe, computeSnapshot, getServerSnapshot);

  const setField = useCallback(
    <K extends keyof DieselFormState>(key: K, value: DieselFormState[K]) => {
      const next = { ...computeSnapshot(), [key]: value };
      writeLocalStorageRaw(STORE_KEY, JSON.stringify(next));
    },
    []
  );

  return { form, setField };
}
