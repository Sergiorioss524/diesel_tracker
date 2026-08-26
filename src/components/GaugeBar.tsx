import { DieselResults } from "@/lib/calc";
import { fmtNum, fmtUSD, fmtUSD4 } from "@/lib/format";

interface Props {
  results: DieselResults;
}

export default function GaugeBar({ results }: Props) {
  return (
    <div className="gauge-bar">
      <div className="gauge-grid">
        <div className="gauge">
          <div className="g-label">Costo desembarcado / {results.unitLabel}</div>
          <div className="g-value num">{fmtUSD4(results.costoPorUnidad)}</div>
        </div>
        <div className="gauge">
          <div className="g-label">Ganancia / {results.unitLabel}</div>
          <div className={`g-value num ${results.gananciaPorUnidad >= 0 ? "good" : "bad"}`}>
            {fmtUSD4(results.gananciaPorUnidad)}
          </div>
        </div>
        <div className="gauge">
          <div className="g-label">Margen</div>
          <div className={`g-value num ${results.margen >= 0 ? "good" : "bad"}`}>
            {fmtNum(results.margen, 1)}%
          </div>
        </div>
        <div className="gauge">
          <div className="g-label">Ganancia total del embarque</div>
          <div className={`g-value num ${results.gananciaBruta >= 0 ? "good" : "bad"}`}>
            {fmtUSD(results.gananciaBruta)}
          </div>
        </div>
      </div>
    </div>
  );
}
