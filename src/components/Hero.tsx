"use client";

import { useTheme } from "@/hooks/useTheme";

export default function Hero() {
  const { toggle, label } = useTheme();

  return (
    <div className="hero">
      <div className="hero-inner">
        <div>
          <p className="eyebrow">Importación · EE. UU. → destino</p>
          <h1>Control de Diésel</h1>
          <p className="sub">
            Calcula el costo desembarcado y la ganancia en dólares de cada embarque, y lleva el
            registro de los barcos en tránsito.
          </p>
        </div>
        <button className="theme-toggle" type="button" onClick={toggle}>
          🌗 <span>{label}</span>
        </button>
      </div>
    </div>
  );
}
