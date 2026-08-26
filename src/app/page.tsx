"use client";

import { useMemo } from "react";
import Hero from "@/components/Hero";
import GaugeBar from "@/components/GaugeBar";
import VolumeCard from "@/components/VolumeCard";
import PurchaseFreightCard from "@/components/PurchaseFreightCard";
import TariffsCard from "@/components/TariffsCard";
import FinancingCard from "@/components/FinancingCard";
import StorageCard from "@/components/StorageCard";
import SalePriceCard from "@/components/SalePriceCard";
import BreakdownChart from "@/components/BreakdownChart";
import ResultCard from "@/components/ResultCard";
import ShipmentTracker from "@/components/ShipmentTracker";
import { useDieselForm } from "@/hooks/useDieselForm";
import { computeResults } from "@/lib/calc";

export default function Home() {
  const { form, setField } = useDieselForm();
  const results = useMemo(() => computeResults(form), [form]);

  return (
    <>
      <Hero />
      <GaugeBar results={results} />

      <div className="wrap">
        <div className="grid-main">
          <div className="stack">
            <VolumeCard form={form} setField={setField} unitEcho={results.unitEcho} />
            <PurchaseFreightCard form={form} setField={setField} />
            <TariffsCard form={form} setField={setField} />
            <FinancingCard form={form} setField={setField} />
            <StorageCard form={form} setField={setField} />
            <SalePriceCard form={form} setField={setField} />
          </div>

          <div className="sticky-col">
            <BreakdownChart segments={results.segments} />
            <ResultCard results={results} tipoCambio={form.tipoCambio} />
          </div>
        </div>

        <ShipmentTracker />
      </div>

      <footer className="page-foot">
        Herramienta de cálculo — ajusta los porcentajes de aranceles e impuestos a los vigentes en
        tu país de destino. Los datos que ingreses se guardan solo en este navegador.
      </footer>
    </>
  );
}
