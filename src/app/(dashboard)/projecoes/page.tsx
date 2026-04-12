"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { investidor, relatorios, formatCurrency } from "@/lib/mock-data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Target, Calendar, TrendingUp, Wallet } from "lucide-react";

export default function ProjecoesPage() {
  const mediaLiquido =
    relatorios.reduce((a, r) => a + r.resultadoLiquido, 0) / relatorios.length;
  const restante = investidor.investimentoTotal - investidor.totalRecuperado;
  const mesesRestantes = Math.ceil(restante / mediaLiquido);
  const progressPercent =
    (investidor.totalRecuperado / investidor.investimentoTotal) * 100;

  // Projeção mês a mês
  const projecao = [];
  let acumulado = 0;
  for (let i = 1; i <= investidor.paybackMeses + 12; i++) {
    acumulado += mediaLiquido;
    projecao.push({
      mes: i,
      acumulado: Math.min(acumulado, investidor.investimentoTotal * 1.5),
      investimento: investidor.investimentoTotal,
    });
  }

  const paybackAnos = (investidor.paybackMeses / 12).toFixed(1);
  const retorno25anos = mediaLiquido * 12 * 25;
  const roi = ((retorno25anos / investidor.investimentoTotal) * 100).toFixed(0);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Projeções</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Análise de payback, rentabilidade e projeção de retorno do investimento
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vertus-orange/10">
                <Calendar className="h-5 w-5 text-vertus-orange" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Payback Estimado</p>
                <p className="text-xl font-bold">{paybackAnos} anos</p>
                <p className="text-xs text-muted-foreground">{investidor.paybackMeses} meses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Rentabilidade Anual</p>
                <p className="text-xl font-bold text-emerald-500">{investidor.rentabilidadeAnual}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Wallet className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Retorno em 25 anos</p>
                <p className="text-xl font-bold">{formatCurrency(retorno25anos)}</p>
                <p className="text-xs text-muted-foreground">ROI {roi}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vertus-orange/10">
                <Target className="h-5 w-5 text-vertus-orange" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Média Mensal</p>
                <p className="text-xl font-bold text-vertus-orange">{formatCurrency(mediaLiquido)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de progresso do payback */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">
            Progresso do Payback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Mês {investidor.mesesDecorridos} de {investidor.paybackMeses}
            </span>
            <span className="font-semibold">{progressPercent.toFixed(1)}%</span>
          </div>
          <div className="relative h-6 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-vertus-orange via-vertus-orange to-vertus-orange/60 transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white mix-blend-difference">
              {progressPercent.toFixed(1)}%
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <p className="text-xs text-muted-foreground">Investido</p>
              <p className="text-sm font-semibold">{formatCurrency(investidor.investimentoTotal)}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <p className="text-xs text-muted-foreground">Recuperado</p>
              <p className="text-sm font-semibold text-emerald-500">{formatCurrency(investidor.totalRecuperado)}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <p className="text-xs text-muted-foreground">Restante</p>
              <p className="text-sm font-semibold text-vertus-orange">{formatCurrency(restante)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico projeção */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">
            Curva de Retorno Projetada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projecao}>
                <XAxis dataKey="mes" tick={{ fill: "#A3A3A3", fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: "Meses", position: "insideBottom", offset: -5, fill: "#A3A3A3", fontSize: 11 }} />
                <YAxis tick={{ fill: "#A3A3A3", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} contentStyle={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "8px", color: "#F1F1F1", fontSize: "12px" }} />
                <ReferenceLine y={investidor.investimentoTotal} stroke="#FF7E27" strokeDasharray="6 3" label={{ value: "Payback", fill: "#FF7E27", fontSize: 11 }} />
                <Line type="monotone" dataKey="acumulado" name="Retorno Acumulado" stroke="#10B981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="investimento" name="Investimento" stroke="#FF7E27" strokeWidth={1} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
