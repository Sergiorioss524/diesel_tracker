import { DieselFormState, Unit } from "@/lib/types";
import { UnitEcho } from "@/lib/calc";
import { fmtNum } from "@/lib/format";
import NumberField from "./NumberField";

interface VolumeCardProps {
  form: DieselFormState;
  setField: <K extends keyof DieselFormState>(key: K, value: DieselFormState[K]) => void;
  unitEcho: UnitEcho;
}

export default function VolumeCard({ form, setField, unitEcho }: VolumeCardProps) {
  return (
    <section className="card">
      <h2>Volumen a importar</h2>
      <p className="card-hint">
        Elige la unidad en la que compras y vendes — el resto de precios de este cálculo se
        expresan en esa misma unidad.
      </p>
      <div className="field-grid">
        <NumberField
          id="volumen"
          label="Cantidad"
          value={form.volumen}
          onChange={(v) => setField("volumen", v)}
          min={0}
          step={1}
        />
        <label className="field" htmlFor="unidad">
          <span className="lbl">Unidad</span>
          <select
            id="unidad"
            value={form.unidad}
            onChange={(e) => setField("unidad", e.target.value as Unit)}
          >
            <option value="gal">Galones</option>
            <option value="bbl">Barriles (42 gal)</option>
            <option value="L">Litros</option>
            <option value="ton">Toneladas métricas</option>
          </select>
        </label>
        <NumberField
          id="densidad"
          label="Densidad del diésel"
          value={form.densidad}
          onChange={(v) => setField("densidad", v)}
          suffix="kg/L"
          hint="Solo se usa para el equivalente en toneladas (0.82–0.86 típico)."
          min={0.7}
          max={1}
          step={0.001}
        />
        <NumberField
          id="merma"
          label="Merma / pérdida en tránsito"
          value={form.merma}
          onChange={(v) => setField("merma", v)}
          suffix="%"
          min={0}
          max={20}
          step={0.1}
        />
      </div>
      <div className="unit-echo">
        ≈ {fmtNum(unitEcho.gal, 0)} gal · {fmtNum(unitEcho.bbl, 1)} bbl · {fmtNum(unitEcho.L, 0)} L
        · {fmtNum(unitEcho.ton, 2)} ton
      </div>
    </section>
  );
}
