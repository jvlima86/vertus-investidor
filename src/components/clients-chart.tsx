"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatCurrency } from "@/lib/mock-data";
import type { Cliente } from "@/lib/mock-data";

interface ClientsChartProps {
  clientes: Cliente[];
}

export function ClientsChart({ clientes }: ClientsChartProps) {
  const data = clientes.map((c) => ({
    nome: c.nome.split(" ")[0],
    receita: c.receitaBruta,
    custo: c.custoEnel,
    lucro: c.lucro,
  }));

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">
          Receita vs Custo por Cliente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={2}>
              <XAxis
                dataKey="nome"
                tick={{ fill: "#A3A3A3", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#A3A3A3", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `R$${v}`}
              />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid #2A2A2A",
                  borderRadius: "8px",
                  color: "#F1F1F1",
                  fontSize: "12px",
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value: string) => (
                  <span className="text-xs text-muted-foreground">{value}</span>
                )}
              />
              <Bar
                dataKey="receita"
                name="Receita"
                fill="#FF7E27"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="custo"
                name="Custo ENEL"
                fill="#404040"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
