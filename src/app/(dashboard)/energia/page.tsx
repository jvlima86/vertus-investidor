"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { relatorios, formatNumber, formatCurrency } from "@/lib/mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Zap, Sun, TrendingUp, AlertTriangle } from "lucide-react";

export default function EnergiaPage() {
  const totalGerado = relatorios.reduce((a, r) => a + r.geracaoTotal, 0);
  const totalVendido = relatorios.reduce((a, r) => a + r.energiaVendidaKwh, 0);
  const totalExcedente = relatorios.reduce((a, r) => a + r.excedenteKwh, 0);
  const aproveitamentoMedio = ((totalVendido / totalGerado) * 100).toFixed(1);

  const chartData = [...relatorios].reverse().map((r) => ({
    mes: r.mesReferencia.split(" ")[0].slice(0, 3),
    gerado: r.geracaoTotal,
    vendido: r.energiaVendidaKwh,
    excedente: r.excedenteKwh,
  }));

  const ultimoRelatorio = relatorios[0];

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Energia</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Geração, comercialização e aproveitamento de energia solar
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vertus-orange/10">
                <Sun className="h-5 w-5 text-vertus-orange" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Geração Total</p>
                <p className="text-xl font-bold">{formatNumber(totalGerado)} kWh</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Zap className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Energia Vendida</p>
                <p className="text-xl font-bold text-emerald-500">{formatNumber(totalVendido)} kWh</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Excedente</p>
                <p className="text-xl font-bold text-amber-500">{formatNumber(totalExcedente)} kWh</p>
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
                <p className="text-xs text-muted-foreground">Aproveitamento</p>
                <p className="text-xl font-bold">{aproveitamentoMedio}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico geração */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">
            Geração vs Comercialização
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={2}>
                <XAxis dataKey="mes" tick={{ fill: "#A3A3A3", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#A3A3A3", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v} kWh`} />
                <Tooltip formatter={(value) => `${formatNumber(Number(value))} kWh`} contentStyle={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "8px", color: "#F1F1F1", fontSize: "12px" }} />
                <Legend iconType="circle" iconSize={8} formatter={(value: string) => <span className="text-xs text-muted-foreground">{value}</span>} />
                <Bar dataKey="gerado" name="Gerado" fill="#FF7E27" radius={[4, 4, 0, 0]} />
                <Bar dataKey="vendido" name="Vendido" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="excedente" name="Excedente" fill="#404040" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Distribuição por cliente - último mês */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Distribuição por Cliente — {ultimoRelatorio.mesReferencia}
            </CardTitle>
            <Badge variant="secondary" className="bg-vertus-orange/10 text-vertus-orange">
              {ultimoRelatorio.percentualVendido}% aproveitamento
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {ultimoRelatorio.clientes.map((c) => (
            <div key={c.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span>{c.nome}</span>
                <span className="text-muted-foreground">
                  {formatNumber(c.consumoKwh)} kWh ({c.percentual}%)
                </span>
              </div>
              <Progress value={c.percentual} className="h-2 [&>div]:bg-vertus-orange" />
            </div>
          ))}
          <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/50 p-3 text-sm">
            <span className="text-muted-foreground">Excedente não comercializado</span>
            <span className="font-semibold text-amber-500">
              {formatNumber(ultimoRelatorio.excedenteKwh)} kWh
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
