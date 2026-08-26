import { BreakdownSegment } from "@/lib/calc";
import { fmtNum, fmtUSD } from "@/lib/format";

const BREAKDOWN_COLORS = ["var(--c1)", "var(--c2)", "var(--c3)", "var(--c4)"];

interface Props {
  segments: BreakdownSegment[];
}

export default function BreakdownChart({ segments }: Props) {
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;

  return (
    <section className="card">
      <h2>Desglose del costo</h2>
      <p className="card-hint">Cómo se compone el costo total desembarcado.</p>
      <div className="breakdown-bar">
        {segments.map((s, i) => {
          const pct = (s.value / total) * 100;
          return (
            <div
              key={s.name}
              className="seg"
              style={{ width: `${Math.max(pct, 0)}%`, background: BREAKDOWN_COLORS[i] }}
              title={`${s.name}: ${fmtUSD(s.value)}`}
            />
          );
        })}
      </div>
      <div className="legend">
        {segments.map((s, i) => {
          const pct = (s.value / total) * 100;
          return (
            <div className="legend-row" key={s.name}>
              <span className="swatch" style={{ background: BREAKDOWN_COLORS[i] }} />
              <span className="lname">{s.name}</span>
              <span className="lval num">
                {fmtUSD(s.value)} · {fmtNum(pct, 1)}%
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
