import { DieselFormState, Unit, UNIT_LABEL } from "./types";

const BBL_TO_GAL = 42;
const GAL_TO_L = 3.785411784;

function num(value: string): number {
  return parseFloat(value) || 0;
}

function litersPerTon(density: number): number {
  return density > 0 ? 1000 / density : 0;
}

function toGallons(value: number, unit: Unit, density: number): number {
  switch (unit) {
    case "gal":
      return value;
    case "bbl":
      return value * BBL_TO_GAL;
    case "L":
      return value / GAL_TO_L;
    case "ton":
      return (value * litersPerTon(density)) / GAL_TO_L;
    default:
      return value;
  }
}

export interface UnitEcho {
  gal: number;
  bbl: number;
  L: number;
  ton: number;
}

export interface BreakdownSegment {
  name: string;
  value: number;
}

export interface DieselResults {
  fob: number;
  flete: number;
  seguro: number;
  cif: number;
  arancel: number;
  iva: number;
  otrosAduana: number;
  aduanaTotal: number;
  interes: number;
  logistica: number;
  compraFlete: number;
  costoTotal: number;
  volVendible: number;
  costoPorUnidad: number;
  ingreso: number;
  gananciaBruta: number;
  margen: number;
  gananciaPorUnidad: number;
  segments: BreakdownSegment[];
  unitEcho: UnitEcho;
  unitLabel: string;
}

export function computeResults(state: DieselFormState): DieselResults {
  const vol = num(state.volumen);
  const merma = num(state.merma);
  const precioFOB = num(state.precioFOB);
  const flete = num(state.flete);
  const seguroPct = num(state.seguroPct);
  const arancelPct = num(state.arancelPct);
  const ivaPct = num(state.ivaPct);
  const otrosAduana = num(state.otrosAduana);
  const montoFin = num(state.montoFinanciado);
  const tasaInt = num(state.tasaInteres);
  const plazoDias = num(state.plazoDias);
  const almacenaje = num(state.almacenaje);
  const transporteLocal = num(state.transporteLocal);
  const precioVenta = num(state.precioVenta);
  const densidad = num(state.densidad) || 0.85;

  const fob = precioFOB * vol;
  const cfr = fob + flete;
  const seguro = cfr * (seguroPct / 100);
  const cif = cfr + seguro;
  const arancel = cif * (arancelPct / 100);
  const iva = (cif + arancel) * (ivaPct / 100);
  const aduanaTotal = arancel + iva + otrosAduana;
  const interes = montoFin * (tasaInt / 100) * (plazoDias / 365);
  const logistica = almacenaje + transporteLocal;

  const compraFlete = fob + flete + seguro;
  const costoTotal = compraFlete + aduanaTotal + interes + logistica;

  const volVendible = vol * (1 - merma / 100);
  const costoPorUnidad = volVendible > 0 ? costoTotal / volVendible : 0;
  const ingreso = precioVenta * volVendible;
  const gananciaBruta = ingreso - costoTotal;
  const margen = ingreso > 0 ? (gananciaBruta / ingreso) * 100 : 0;
  const gananciaPorUnidad = volVendible > 0 ? gananciaBruta / volVendible : 0;

  const segments: BreakdownSegment[] = [
    { name: "Compra + flete", value: compraFlete },
    { name: "Aduana (seguro, arancel, impuestos)", value: seguro + aduanaTotal },
    { name: "Financiamiento", value: interes },
    { name: "Almacenamiento y logística", value: logistica },
  ];

  const gal = toGallons(vol, state.unidad, densidad);
  const bbl = gal / BBL_TO_GAL;
  const L = gal * GAL_TO_L;
  const ton = L / litersPerTon(densidad);

  return {
    fob,
    flete,
    seguro,
    cif,
    arancel,
    iva,
    otrosAduana,
    aduanaTotal,
    interes,
    logistica,
    compraFlete,
    costoTotal,
    volVendible,
    costoPorUnidad,
    ingreso,
    gananciaBruta,
    margen,
    gananciaPorUnidad,
    segments,
    unitEcho: { gal, bbl, L, ton },
    unitLabel: UNIT_LABEL[state.unidad],
  };
}
