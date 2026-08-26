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

export const SEED_SHIPMENTS: Shipment[] = [
  {
    name: "MT Gulf Voyager",
    imo: "9456127",
    origin: "Houston",
    dest: "Rotterdam",
    date: "2026-08-20",
    status: "transito",
  },
  {
    name: "MT Pacific Horizon",
    imo: "9387215",
    origin: "Singapore",
    dest: "Fujairah",
    date: "2026-09-02",
    status: "programado",
  },
  {
    name: "MT Coral Endeavor",
    imo: "9512334",
    origin: "Santos",
    dest: "Buenos Aires",
    date: "2026-08-10",
    status: "llegado",
  },
  {
    name: "MT Northern Star",
    imo: "9298871",
    origin: "Rotterdam",
    dest: "Houston",
    date: "2026-08-05",
    status: "retrasado",
  },
];

export type ThemeMode = "system" | "light" | "dark";
