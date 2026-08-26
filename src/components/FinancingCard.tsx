import { DieselFormState } from "@/lib/types";
import NumberField from "./NumberField";

interface Props {
  form: DieselFormState;
  setField: <K extends keyof DieselFormState>(key: K, value: DieselFormState[K]) => void;
}

export default function FinancingCard({ form, setField }: Props) {
  return (
    <section className="card">
      <h2>Financiamiento y tipo de cambio</h2>
      <p className="card-hint">
        Si financias la compra, el interés se suma al costo. El tipo de cambio es opcional — solo
        se usa para mostrar tus cifras también en moneda local.
      </p>
      <div className="field-grid">
        <NumberField
          id="montoFinanciado"
          label="Monto financiado"
          value={form.montoFinanciado}
          onChange={(v) => setField("montoFinanciado", v)}
          prefix="$"
          min={0}
          step={1}
        />
        <NumberField
          id="tasaInteres"
          label="Tasa de interés anual"
          value={form.tasaInteres}
          onChange={(v) => setField("tasaInteres", v)}
          suffix="%"
          min={0}
          step={0.1}
        />
        <NumberField
          id="plazoDias"
          label="Plazo del crédito"
          value={form.plazoDias}
          onChange={(v) => setField("plazoDias", v)}
          suffix="días"
          min={0}
          step={1}
        />
        <NumberField
          id="tipoCambio"
          label="Tipo de cambio (opcional)"
          value={form.tipoCambio}
          onChange={(v) => setField("tipoCambio", v)}
          suffix="moneda local / USD"
          placeholder="ej. 6.96"
          min={0}
          step={0.01}
        />
      </div>
    </section>
  );
}
