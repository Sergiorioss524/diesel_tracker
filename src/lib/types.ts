export type Unit = "gal" | "bbl" | "L" | "ton";

export const UNIT_LABEL: Record<Unit, string> = {
  gal: "gal",
  bbl: "bbl",
  L: "L",
  ton: "ton",
};

export interface DieselFormState {
  volumen: string;
  unidad: Unit;
  densidad: string;
  merma: string;
  precioFOB: string;
  flete: string;
  seguroPct: string;
  arancelPct: string;
  ivaPct: string;
  otrosAduana: string;
  montoFinanciado: string;
  tasaInteres: string;
  plazoDias: string;
  tipoCambio: string;
  almacenaje: string;
  transporteLocal: string;
  precioVenta: string;
}

export const DEFAULT_FORM_STATE: DieselFormState = {
  volumen: "42000",
  unidad: "gal",
  densidad: "0.850",
  merma: "0.3",
  precioFOB: "2.35",
  flete: "18000",
  seguroPct: "0.6",
  arancelPct: "0",
  ivaPct: "0",
  otrosAduana: "0",
  montoFinanciado: "0",
  tasaInteres: "0",
  plazoDias: "0",
  tipoCambio: "",
  almacenaje: "0",
  transporteLocal: "0",
  precioVenta: "2.85",
};

export type ShipmentStatus = "programado" | "transito" | "llegado" | "retrasado";

export const STATUS_LABELS: Record<ShipmentStatus, string> = {
  programado: "Programado",
  transito: "En tránsito",
  llegado: "Llegado",
  retrasado: "Retrasado",
};

export interface Shipment {
  name: string;
  imo: string;
  origin: string;
  dest: string;
  date: string;
  status: ShipmentStatus;
}

export type ThemeMode = "system" | "light" | "dark";
