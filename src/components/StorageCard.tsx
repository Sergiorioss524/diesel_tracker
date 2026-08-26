import { DieselFormState } from "@/lib/types";
import NumberField from "./NumberField";

interface Props {
  form: DieselFormState;
  setField: <K extends keyof DieselFormState>(key: K, value: DieselFormState[K]) => void;
}

export default function StorageCard({ form, setField }: Props) {
  return (
    <section className="card">
      <h2>Almacenamiento y logística local</h2>
      <p className="card-hint">Costos una vez que el diésel llega a puerto de destino, antes de la venta.</p>
      <div className="field-grid">
        <NumberField
          id="almacenaje"
          label="Bodegaje / almacenamiento"
          value={form.almacenaje}
          onChange={(v) => setField("almacenaje", v)}
          prefix="$"
          min={0}
          step={1}
        />
        <NumberField
          id="transporteLocal"
          label="Transporte terrestre local"
          value={form.transporteLocal}
          onChange={(v) => setField("transporteLocal", v)}
          prefix="$"
          min={0}
          step={1}
        />
      </div>
    </section>
  );
}
