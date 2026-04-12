"use client";

import { useState } from "react";
import { KpiCards } from "@/components/kpi-cards";
import { EnergyBalance } from "@/components/energy-balance";
import { FinancialStatement } from "@/components/financial-statement";
import { RevenueChart } from "@/components/revenue-chart";
import { ClientsChart } from "@/components/clients-chart";
import { ClientsList } from "@/components/clients-list";
import { PaybackProjection } from "@/components/payback-projection";
import { PlantDetails } from "@/components/plant-details";
import { DeductionsSummary } from "@/components/deductions-summary";
import { Methodology } from "@/components/methodology";
import { PeriodSelector } from "@/components/period-selector";
import { relatorios, investidor } from "@/lib/mock-data";
import { MapPin, FileText } from "lucide-react";

export default function HomePage() {
  const [selectedPeriod, setSelectedPeriod] = useState(relatorios[0].id);
  const relatorio = relatorios.find((r) => r.id === selectedPeriod)!;

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Relatório de Prestação de Contas
          </h1>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {investidor.localizacao}
            </span>
            <span className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" />
              Pgto: {relatorio.mesPagamento}
            </span>
          </div>
        </div>
        <PeriodSelector
          relatorios={relatorios}
          selectedId={selectedPeriod}
          onSelect={setSelectedPeriod}
        />
      </div>

      <KpiCards
        resultadoLiquido={relatorio.resultadoLiquido}
        receitaBruta={relatorio.receitaBruta}
        geracaoTotal={relatorio.geracaoTotal}
        percentualVendido={relatorio.percentualVendido}
        energiaVendidaKwh={relatorio.energiaVendidaKwh}
        energiaDisponivelKwh={relatorio.energiaDisponivelKwh}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <EnergyBalance
          percentualVendido={relatorio.percentualVendido}
          excedenteKwh={relatorio.excedenteKwh}
          energiaVendidaKwh={relatorio.energiaVendidaKwh}
          clientes={relatorio.clientes}
        />
        <div className="space-y-6">
          <FinancialStatement
            receitaBruta={relatorio.receitaBruta}
            custosEnel={relatorio.custosEnel}
            taxasMinimas={relatorio.taxasMinimas}
            resultadoLiquido={relatorio.resultadoLiquido}
          />
          <RevenueChart
            resultadoLiquido={relatorio.resultadoLiquido}
            custosEnel={relatorio.custosEnel}
            taxasMinimas={relatorio.taxasMinimas}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ClientsList clientes={relatorio.clientes} />
        <ClientsChart clientes={relatorio.clientes} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DeductionsSummary relatorio={relatorio} />
        <PaybackProjection investidor={investidor} />
      </div>

      <PlantDetails usinas={relatorio.usinas} />
      <Methodology />

      <footer className="border-t border-border pt-6 pb-8 text-center">
        <p className="text-xs text-muted-foreground">
          Vertus Solar — Portal do Investidor
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Dados originados das faturas ENEL Ceará
        </p>
      </footer>
    </>
  );
}
