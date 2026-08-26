import { DieselResults } from "@/lib/calc";
import { fmtNum, fmtUSD } from "@/lib/format";

interface Props {
  results: DieselResults;
  tipoCambio: string;
}

export default function ResultCard({ results, tipoCambio }: Props) {
  const tc = parseFloat(tipoCambio) || 0;

  const lines: [string, string][] = [
    ["Compra FOB", fmtUSD(results.fob)],
    ["Flete marítimo", fmtUSD(results.flete)],
    ["Seguro de carga", fmtUSD(results.seguro)],
    ["= Valor CIF", fmtUSD(results.cif)],
    ["Arancel", fmtUSD(results.arancel)],
    ["IVA / impuesto de importación", fmtUSD(results.iva)],
    ["Otros cargos aduaneros", fmtUSD(results.otrosAduana)],
    ["Interés de financiamiento", fmtUSD(results.interes)],
    ["Almacenamiento y logística", fmtUSD(results.logistica)],
  ];

  return (
    <section className="card">
      <h2>Resultado del embarque</h2>
      <div>
        {lines.map(([label, value]) => (
          <div className="result-line" key={label}>
            <span className="rl-label">{label}</span>
            <span className="rl-value num">{value}</span>
          </div>
        ))}
        <div className="result-line total">
          <span className="rl-label">Costo total desembarcado</span>
          <span className="rl-value num">{fmtUSD(results.costoTotal)}</span>
        </div>
        <div className="result-line">
          <span className="rl-label">Volumen vendible (tras merma)</span>
          <span className="rl-value num">
            {fmtNum(results.volVendible, 1)} {results.unitLabel}
          </span>
        </div>
        <div className="result-line">
          <span className="rl-label">Ingreso por venta</span>
          <span className="rl-value num">{fmtUSD(results.ingreso)}</span>
        </div>
        <div className="result-line total">
          <span className="rl-label">Ganancia bruta</span>
          <span
            className="rl-value num"
            style={{ color: results.gananciaBruta >= 0 ? "var(--good-text)" : "var(--critical)" }}
          >
            {fmtUSD(results.gananciaBruta)}
          </span>
        </div>
      </div>
      {tc > 0 && (
        <div className="unit-echo">
          ≈ {fmtNum(results.gananciaBruta * tc, 2)} (moneda local) de ganancia, al tipo de cambio
          ingresado de {fmtNum(tc, 2)} por USD.
        </div>
      )}
    </section>
  );
}
