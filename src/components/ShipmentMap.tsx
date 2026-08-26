"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from "react-leaflet";
import { divIcon, LatLngBoundsExpression, LatLngTuple } from "leaflet";
import { Shipment, ShipmentStatus, ThemeMode } from "@/lib/types";
import { findPort, Port } from "@/lib/ports";

const STATUS_COLOR: Record<ShipmentStatus, string> = {
  programado: "#2a78d6",
  transito: "#b06a17",
  llegado: "#0ca30c",
  retrasado: "#d03b3b",
};

function portIcon(color: string) {
  return divIcon({
    className: "port-marker",
    html: `<span style="background:${color}"></span>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
}

function useIsDark(mode: ThemeMode): boolean {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setDark(mode === "dark" || (mode === "system" && mq.matches));
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [mode]);
  return dark;
}

interface Route {
  shipment: Shipment;
  origin: Port;
  dest: Port;
}

export default function ShipmentMap({
  shipments,
  themeMode,
}: {
  shipments: Shipment[];
  themeMode: ThemeMode;
}) {
  const dark = useIsDark(themeMode);

  const { routes, points, unmatched } = useMemo(() => {
    const routes: Route[] = [];
    const singlePoints: { port: Port; shipment: Shipment }[] = [];
    let unmatched = 0;

    for (const s of shipments) {
      const origin = s.origin ? findPort(s.origin) : null;
      const dest = s.dest ? findPort(s.dest) : null;
      if (origin && dest) routes.push({ shipment: s, origin, dest });
      else if (origin) singlePoints.push({ port: origin, shipment: s });
      else if (dest) singlePoints.push({ port: dest, shipment: s });
      else if (s.origin || s.dest) unmatched += 1;
    }

    const points = new Map<string, { port: Port; shipments: Shipment[] }>();
    for (const r of routes) {
      for (const port of [r.origin, r.dest]) {
        const key = port.name;
        const entry = points.get(key) ?? { port, shipments: [] };
        entry.shipments.push(r.shipment);
        points.set(key, entry);
      }
    }
    for (const { port, shipment } of singlePoints) {
      const key = port.name;
      const entry = points.get(key) ?? { port, shipments: [] };
      entry.shipments.push(shipment);
      points.set(key, entry);
    }

    return { routes, points: Array.from(points.values()), unmatched };
  }, [shipments]);

  const bounds: LatLngBoundsExpression | undefined =
    points.length > 0
      ? (points.map((p) => [p.port.lat, p.port.lng]) as LatLngTuple[])
      : undefined;

  return (
    <div className={`map-wrap${dark ? " map-dark" : ""}`}>
      <MapContainer
        className="ship-map"
        center={[20, 0]}
        zoom={2}
        bounds={bounds}
        boundsOptions={{ padding: [30, 30] }}
        scrollWheelZoom={false}
        worldCopyJump
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {routes.map((r, i) => (
          <Polyline
            key={i}
            positions={[
              [r.origin.lat, r.origin.lng],
              [r.dest.lat, r.dest.lng],
            ]}
            pathOptions={{
              color: STATUS_COLOR[r.shipment.status],
              weight: 2,
              opacity: 0.75,
              dashArray: r.shipment.status === "programado" ? "5 5" : undefined,
            }}
          />
        ))}
        {points.map(({ port, shipments: ships }) => (
          <Marker
            key={port.name}
            position={[port.lat, port.lng]}
            icon={portIcon(STATUS_COLOR[ships[ships.length - 1].status])}
          >
            <Tooltip direction="top" offset={[0, -6]}>
              <strong>{port.name}</strong>
              <br />
              {ships.map((s) => s.name || s.imo || "—").join(", ")}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
      {(points.length === 0 || unmatched > 0) && (
        <p className="map-hint">
          {points.length === 0
            ? "Añade un origen o destino con el nombre de un puerto conocido (ej. Houston, Rotterdam, Singapur) para verlo en el mapa."
            : `${unmatched} embarque(s) con puerto no reconocido no se muestran en el mapa.`}
        </p>
      )}
    </div>
  );
}
