"use client";

import dynamic from "next/dynamic";
import { FormEvent, useState } from "react";
import { useShipments } from "@/hooks/useShipments";
import { useTheme } from "@/hooks/useTheme";
import { STATUS_LABELS } from "@/lib/types";

const ShipmentMap = dynamic(() => import("@/components/ShipmentMap"), {
  ssr: false,
  loading: () => <div className="map-wrap map-loading">Cargando mapa…</div>,
});

function trackUrl(name: string, imo: string): string {
  const q = imo || name;
  return "https://www.marinetraffic.com/en/ais/index/search/all?keyword=" + encodeURIComponent(q);
}

export default function ShipmentTracker() {
  const { shipments, addShipment, removeShipment, cycleStatus } = useShipments();
  const { mode } = useTheme();
  const [name, setName] = useState("");
  const [imo, setImo] = useState("");
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [date, setDate] = useState("");

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedImo = imo.trim();
    if (!trimmedName && !trimmedImo) return;
    addShipment({
      name: trimmedName,
      imo: trimmedImo,
      origin: origin.trim(),
      dest: dest.trim(),
      date,
    });
    setName("");
    setImo("");
    setOrigin("");
    setDest("");
    setDate("");
  }

  return (
    <section className="card" style={{ marginTop: 22 }}>
      <h2>Seguimiento de embarques</h2>
      <p className="card-hint">
        Registra tus barcos y consulta su posición en un rastreador AIS público. Los datos de
        ubicación no viven dentro de esta página — el enlace te lleva al sitio del rastreador con
        la búsqueda ya cargada.
      </p>

      <ShipmentMap shipments={shipments} themeMode={mode} />

      <form className="track-form" onSubmit={handleAdd}>
        <label className="field">
          <span className="lbl">Barco</span>
          <input
            type="text"
            placeholder="Nombre del buque"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="field">
          <span className="lbl">IMO</span>
          <input
            type="text"
            placeholder="7 dígitos"
            inputMode="numeric"
            value={imo}
            onChange={(e) => setImo(e.target.value)}
          />
        </label>
        <label className="field">
          <span className="lbl">Origen</span>
          <input
            type="text"
            placeholder="ej. Houston, TX"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </label>
        <label className="field">
          <span className="lbl">Destino</span>
          <input
            type="text"
            placeholder="Puerto destino"
            value={dest}
            onChange={(e) => setDest(e.target.value)}
          />
        </label>
        <label className="field">
          <span className="lbl">Salida est.</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <button className="btn-add" type="submit">
          + Añadir
        </button>
      </form>

      <table className="manifest">
        <thead>
          <tr>
            <th>Barco</th>
            <th>IMO</th>
            <th>Ruta</th>
            <th>Salida est.</th>
            <th>Estado</th>
            <th>Rastrear</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {shipments.length === 0 ? (
            <tr className="empty-row">
              <td colSpan={7}>Aún no registraste ningún embarque.</td>
            </tr>
          ) : (
            shipments.map((s, idx) => (
              <tr key={idx}>
                <td>{s.name || "—"}</td>
                <td className="num">{s.imo || "—"}</td>
                <td>
                  {s.origin || "—"} → {s.dest || "—"}
                </td>
                <td className="num">{s.date || "—"}</td>
                <td>
                  <button
                    type="button"
                    className={`chip ${s.status}`}
                    title="Clic para cambiar de estado"
                    onClick={() => cycleStatus(idx)}
                  >
                    {STATUS_LABELS[s.status]}
                  </button>
                </td>
                <td>
                  <a
                    className="track-link"
                    href={trackUrl(s.name, s.imo)}
                    target="_blank"
                    rel="noopener"
                  >
                    Ver en MarineTraffic ↗
                  </a>
                </td>
                <td>
                  <button
                    className="btn-del"
                    title="Eliminar"
                    onClick={() => removeShipment(idx)}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="note">
        <p>
          <strong>¿Se puede ver la ubicación en tiempo real?</strong> Sí, con matices. Los barcos
          transmiten su posición por AIS. Cerca de la costa, estaciones terrestres la captan cada
          pocos segundos; en alta mar, depende de satélites y la actualización llega cada varios
          minutos — no es instantáneo, y un barco puede apagar el transpondedor. El{" "}
          <strong>número IMO</strong> (7 dígitos) identifica al casco de forma permanente aunque
          el barco cambie de nombre o bandera, así que es el mejor dato para buscarlo.
        </p>
        <p>
          Herramientas gratuitas como MarineTraffic, VesselFinder o MyShipTracking muestran la
          posición con ese nivel de cobertura sin costo; sus planes de pago agregan histórico de
          rutas, alertas y mejor cobertura satelital.
        </p>
      </div>

      <div className="tool-links">
        <a
          className="tool-link"
          href="https://www.marinetraffic.com/en/ais/index/search/all"
          target="_blank"
          rel="noopener"
        >
          MarineTraffic ↗
        </a>
        <a className="tool-link" href="https://www.vesselfinder.com/" target="_blank" rel="noopener">
          VesselFinder ↗
        </a>
        <a
          className="tool-link"
          href="https://www.myshiptracking.com/"
          target="_blank"
          rel="noopener"
        >
          MyShipTracking ↗
        </a>
      </div>
    </section>
  );
}
