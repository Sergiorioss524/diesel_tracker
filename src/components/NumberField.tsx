interface NumberFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

export default function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
  min,
  max,
  step,
  placeholder,
}: NumberFieldProps) {
  return (
    <label className="field" htmlFor={id}>
      <span className="lbl">{label}</span>
      <div className={`input-row${prefix ? "" : " noprefix"}`}>
        {prefix && <span className="prefix">{prefix}</span>}
        <input
          type="number"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
        />
        {suffix && <span className="suffix">{suffix}</span>}
      </div>
      {hint && <span className="unit-hint">{hint}</span>}
    </label>
  );
}
