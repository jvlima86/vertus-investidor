"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/mock-data";
import type { RelatorioMensal } from "@/lib/mock-data";

interface DeductionsSummaryProps {
  relatorio: RelatorioMensal;
}

export function DeductionsSummary({ relatorio }: DeductionsSummaryProps) {
  const deductions = relatorio.usinas.map((u) => ({
    label: `Taxa mínima — ${u.medidor}`,
    value: u.taxaMinima,
  }));

  const totalDeductions = deductions.reduce((acc, d) => acc + d.value, 0);

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">
          Resumo de Deduções
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Lucro Bruto</span>
            <span className="font-medium text-emerald-500">
              {formatCurrency(relatorio.lucroBruto)}
            </span>
          </div>

          <Separator />

          {deductions.map((d) => (
            <div
              key={d.label}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-muted-foreground">{d.label}</span>
              <span className="font-medium text-red-400">
                -{formatCurrency(d.value)}
              </span>
            </div>
          ))}

          <Separator />

          <div className="flex items-center justify-between">
            <span className="font-semibold">Total ao Investidor</span>
            <span className="text-lg font-bold text-vertus-orange">
              {formatCurrency(relatorio.resultadoLiquido)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
