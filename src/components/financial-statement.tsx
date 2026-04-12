"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/mock-data";

interface FinancialStatementProps {
  receitaBruta: number;
  custosEnel: number;
  taxasMinimas: number;
  resultadoLiquido: number;
}

export function FinancialStatement({
  receitaBruta,
  custosEnel,
  taxasMinimas,
  resultadoLiquido,
}: FinancialStatementProps) {
  const items = [
    { label: "Receita Bruta", value: receitaBruta, type: "positive" as const },
    { label: "Custos ENEL", value: -custosEnel, type: "negative" as const },
    {
      label: "Taxas Mínimas (Medidores)",
      value: -taxasMinimas,
      type: "negative" as const,
    },
  ];

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">
          Demonstrativo Financeiro
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-muted-foreground">{item.label}</span>
              <span
                className={
                  item.type === "positive"
                    ? "font-medium text-emerald-500"
                    : "font-medium text-red-400"
                }
              >
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}
          <Separator className="my-3" />
          <div className="flex items-center justify-between">
            <span className="font-semibold">Resultado Líquido</span>
            <span className="text-lg font-bold text-vertus-orange">
              {formatCurrency(resultadoLiquido)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
