import { DieselFormState } from "@/lib/types";
import NumberField from "./NumberField";

interface Props {
  form: DieselFormState;
  setField: <K extends keyof DieselFormState>(key: K, value: DieselFormState[K]) => void;
}

export default function TariffsCard({ form, setField }: Props) {
  return (
    <section className="card">
      <h2>Aranceles e impuestos de importación</h2>
      <p className="card-hint">
        Se calculan sobre el valor CIF (compra + flete + seguro), que es la base aduanera
        habitual. Ajusta los porcentajes a los de tu país de destino.
      </p>
      <div className="field-grid">
        <NumberField
          id="arancelPct"
          label="Arancel / derecho aduanero"
          value={form.arancelPct}
          onChange={(v) => setField("arancelPct", v)}
          suffix="% del CIF"
          min={0}
          step={0.1}
        />
        <NumberField
          id="ivaPct"
          label="IVA / impuesto de importación"
          value={form.ivaPct}
          onChange={(v) => setField("ivaPct", v)}
          suffix="% de CIF + arancel"
          min={0}
          step={0.1}
        />
        <NumberField
          id="otrosAduana"
          label="Otros cargos aduaneros"
          value={form.otrosAduana}
          onChange={(v) => setField("otrosAduana", v)}
          prefix="$"
          min={0}
          step={1}
        />
      </div>
    </section>
  );
}
