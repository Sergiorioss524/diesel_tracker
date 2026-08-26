import { DieselFormState } from "@/lib/types";
import NumberField from "./NumberField";

interface Props {
  form: DieselFormState;
  setField: <K extends keyof DieselFormState>(key: K, value: DieselFormState[K]) => void;
}

export default function SalePriceCard({ form, setField }: Props) {
  return (
    <section className="card">
      <h2>Precio de venta</h2>
      <div className="field-grid single">
        <NumberField
          id="precioVenta"
          label="Precio de venta por unidad"
          value={form.precioVenta}
          onChange={(v) => setField("precioVenta", v)}
          prefix="$"
          min={0}
          step={0.001}
        />
      </div>
    </section>
  );
}
