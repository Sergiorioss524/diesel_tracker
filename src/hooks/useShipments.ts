"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { SEED_SHIPMENTS, Shipment, ShipmentStatus, STATUS_LABELS } from "@/lib/types";
import {
  getLocalStorageRaw,
  subscribeLocalStorageKey,
  writeLocalStorageRaw,
} from "@/lib/localStorageStore";

const SHIP_KEY = "dieselShipments.v1";
const subscribe = subscribeLocalStorageKey(SHIP_KEY);
const EMPTY: Shipment[] = [];

let cache: { raw: string | null; value: Shipment[] } | null = null;

function computeSnapshot(): Shipment[] {
  const raw = getLocalStorageRaw(SHIP_KEY);
  if (cache && cache.raw === raw) return cache.value;

  let value: Shipment[] = EMPTY;
  if (raw) {
    try {
      value = JSON.parse(raw) as Shipment[];
    } catch {
      value = EMPTY;
    }
  }
  cache = { raw, value };
  return value;
}

function getServerSnapshot(): Shipment[] {
  return EMPTY;
}

export function useShipments() {
  const shipments = useSyncExternalStore(subscribe, computeSnapshot, getServerSnapshot);

  useEffect(() => {
    if (getLocalStorageRaw(SHIP_KEY) === null) {
      writeLocalStorageRaw(SHIP_KEY, JSON.stringify(SEED_SHIPMENTS));
    }
  }, []);

  const addShipment = useCallback((shipment: Omit<Shipment, "status">) => {
    const next = [...computeSnapshot(), { ...shipment, status: "programado" as ShipmentStatus }];
    writeLocalStorageRaw(SHIP_KEY, JSON.stringify(next));
  }, []);

  const removeShipment = useCallback((index: number) => {
    const next = computeSnapshot().filter((_, i) => i !== index);
    writeLocalStorageRaw(SHIP_KEY, JSON.stringify(next));
  }, []);

  const cycleStatus = useCallback((index: number) => {
    const keys = Object.keys(STATUS_LABELS) as ShipmentStatus[];
    const next = computeSnapshot().map((s, i) => {
      if (i !== index) return s;
      const nextStatus = keys[(keys.indexOf(s.status) + 1) % keys.length];
      return { ...s, status: nextStatus };
    });
    writeLocalStorageRaw(SHIP_KEY, JSON.stringify(next));
  }, []);

  return { shipments, addShipment, removeShipment, cycleStatus };
}
