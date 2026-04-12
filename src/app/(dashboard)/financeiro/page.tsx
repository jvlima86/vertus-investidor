"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { relatorios, investidor, formatCurrency } from "@/lib/mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
} from "lucide-react";

export default function FinanceiroPage() {
  const totalReceita = relatorios.reduce((a, r) => a + r.receitaBruta, 0);
  const totalCustos = relatorios.reduce((a, r) => a + r.custosEnel + r.taxasMinimas, 0);
  const totalLiquido = relatorios.reduce((a, r) => a + r.resultadoLiquido, 0);
  const margemMedia = ((totalLiquido / totalReceita) * 100).toFixed(1);

  const chartData = [...relatorios].reverse().map((r) => ({
    mes: r.mesReferencia.split(" ")[0].slice(0, 3),
    receita: r.receitaBruta,
    custos: r.custosEnel + r.taxasMinimas,
    liquido: r.resultadoLiquido,
  }));

  const detailData = [...relatorios].reverse().map((r) => ({
    mes: r.mesReferencia.split(" ")[0].slice(0, 3),
    receitaBruta: r.receitaBruta,
    custosEnel: r.custosEnel,
    taxasMinimas: r.taxasMinimas,
    resultadoLiquido: r.resultadoLiquido,
  }));

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Financeiro</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Visão consolidada de receitas, custos e resultado líquido
        </p>
      </div>

      {/* KPIs financeiros */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vertus-orange/10">
                <DollarSign className="h-5 w-5 text-vertus-orange" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Receita Acumulada</p>
                <p className="text-xl font-bold">{formatCurrency(totalReceita)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                <TrendingDown className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Custos Acumulados</p>
                <p className="text-xl font-bold text-red-400">{formatCurrency(totalCustos)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Wallet className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Resultado Líquido</p>
                <p className="text-xl font-bold text-emerald-500">{formatCurrency(totalLiquido)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Margem Líquida</p>
                <p className="text-xl font-bold">{margemMedia}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico receita vs custos */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">
            Evolução Financeira Mensal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={2}>
                <XAxis dataKey="mes" tick={{ fill: "#A3A3A3", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#A3A3A3", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v}`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} contentStyle={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "8px", color: "#F1F1F1", fontSize: "12px" }} />
                <Legend iconType="circle" iconSize={8} formatter={(value: string) => <span className="text-xs text-muted-foreground">{value}</span>} />
                <Bar dataKey="receita" name="Receita" fill="#FF7E27" radius={[4, 4, 0, 0]} />
                <Bar dataKey="custos" name="Custos" fill="#404040" radius={[4, 4, 0, 0]} />
                <Bar dataKey="liquido" name="Líquido" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabela detalhada */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">
            Detalhamento Mensal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 pr-4">Período</th>
                  <th className="pb-3 pr-4 text-right">Receita Bruta</th>
                  <th className="pb-3 pr-4 text-right">Custos ENEL</th>
                  <th className="pb-3 pr-4 text-right">Taxas</th>
                  <th className="pb-3 text-right">Resultado</th>
                </tr>
              </thead>
              <tbody>
                {relatorios.map((r) => (
                  <tr key={r.id} className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">{r.mesReferencia}</td>
                    <td className="py-3 pr-4 text-right text-emerald-500">
                      {formatCurrency(r.receitaBruta)}
                    </td>
                    <td className="py-3 pr-4 text-right text-red-400">
                      {formatCurrency(r.custosEnel)}
                    </td>
                    <td className="py-3 pr-4 text-right text-red-400">
                      {formatCurrency(r.taxasMinimas)}
                    </td>
                    <td className="py-3 text-right font-semibold text-vertus-orange">
                      {formatCurrency(r.resultadoLiquido)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold">
                  <td className="pt-3">Total</td>
                  <td className="pt-3 text-right text-emerald-500">
                    {formatCurrency(totalReceita)}
                  </td>
                  <td className="pt-3 text-right text-red-400">
                    {formatCurrency(relatorios.reduce((a, r) => a + r.custosEnel, 0))}
                  </td>
                  <td className="pt-3 text-right text-red-400">
                    {formatCurrency(relatorios.reduce((a, r) => a + r.taxasMinimas, 0))}
                  </td>
                  <td className="pt-3 text-right text-vertus-orange">
                    {formatCurrency(totalLiquido)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
