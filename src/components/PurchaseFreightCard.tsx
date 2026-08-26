import { DieselFormState } from "@/lib/types";
import NumberField from "./NumberField";

interface Props {
  form: DieselFormState;
  setField: <K extends keyof DieselFormState>(key: K, value: DieselFormState[K]) => void;
}

export default function PurchaseFreightCard({ form, setField }: Props) {
  return (
    <section className="card">
      <h2>Compra y flete (FOB / CIF)</h2>
      <p className="card-hint">
        Precio de compra en el puerto de EE. UU., más lo que cuesta llevarlo a destino.
      </p>
      <div className="field-grid">
        <NumberField
          id="precioFOB"
          label="Precio FOB por unidad"
          value={form.precioFOB}
          onChange={(v) => setField("precioFOB", v)}
          prefix="$"
          min={0}
          step={0.001}
        />
        <NumberField
          id="flete"
          label="Flete marítimo (total)"
          value={form.flete}
          onChange={(v) => setField("flete", v)}
          prefix="$"
          min={0}
          step={1}
        />
        <NumberField
          id="seguroPct"
          label="Seguro de carga"
          value={form.seguroPct}
          onChange={(v) => setField("seguroPct", v)}
          suffix="% del FOB+flete"
          min={0}
          step={0.01}
        />
      </div>
    </section>
  );
}
