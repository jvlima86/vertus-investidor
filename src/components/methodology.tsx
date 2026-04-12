import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export function Methodology() {
  const formulas = [
    {
      title: "Consumo (kWh)",
      formula: "Custo ENEL ÷ Tarifa por kWh",
    },
    {
      title: "Percentual de Venda",
      formula: "(Energia Vendida ÷ Energia Disponível) × 100",
    },
    {
      title: "Lucro Bruto",
      formula: "Receita Bruta − Custos ENEL",
    },
    {
      title: "Resultado Líquido",
      formula: "Lucro Bruto − Taxas Mínimas dos Medidores",
    },
    {
      title: "Payback",
      formula: "Investimento Total ÷ Resultado Líquido Médio Mensal",
    },
    {
      title: "Rentabilidade Anual",
      formula: "(Resultado Líquido Anualizado ÷ Investimento Total) × 100",
    },
  ];

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-vertus-orange" />
          <CardTitle className="text-base font-semibold">
            Metodologia de Cálculo
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {formulas.map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-border/50 p-3"
            >
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-vertus-orange">
                {f.title}
              </p>
              <p className="text-sm text-muted-foreground">{f.formula}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Dados originados das faturas ENEL Ceará. Os valores são apurados
          mensalmente e podem sofrer variação conforme geração solar e consumo
          dos clientes.
        </p>
      </CardContent>
    </Card>
  );
}
