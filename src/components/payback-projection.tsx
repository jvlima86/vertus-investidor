"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/mock-data";
import { Calendar, TrendingUp, Target } from "lucide-react";
import type { Investidor } from "@/lib/mock-data";

interface PaybackProjectionProps {
  investidor: Investidor;
}

export function PaybackProjection({ investidor }: PaybackProjectionProps) {
  const progressPercent =
    (investidor.mesesDecorridos / investidor.paybackMeses) * 100;
  const restante = investidor.investimentoTotal - investidor.totalRecuperado;
  const paybackAnos = (investidor.paybackMeses / 12).toFixed(1);

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Projeção de Retorno
          </CardTitle>
          <Badge
            variant="secondary"
            className="bg-vertus-orange/10 text-vertus-orange"
          >
            Mês {investidor.mesesDecorridos} de {investidor.paybackMeses}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border border-border/50 p-4 text-center">
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-vertus-orange/10">
              <Calendar className="h-4 w-4 text-vertus-orange" />
            </div>
            <p className="text-xl font-bold">{paybackAnos}</p>
            <p className="text-xs text-muted-foreground">anos (payback)</p>
          </div>
          <div className="rounded-lg border border-border/50 p-4 text-center">
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-xl font-bold text-emerald-500">
              {investidor.rentabilidadeAnual}%
            </p>
            <p className="text-xs text-muted-foreground">rent. anual</p>
          </div>
          <div className="rounded-lg border border-border/50 p-4 text-center">
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
              <Target className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-xl font-bold">
              {formatCurrency(investidor.investimentoTotal)}
            </p>
            <p className="text-xs text-muted-foreground">investido</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso do Payback</span>
            <span className="font-medium">{progressPercent.toFixed(1)}%</span>
          </div>
          <div className="relative h-4 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-vertus-orange via-vertus-orange to-vertus-orange/60 transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white mix-blend-difference">
              {progressPercent.toFixed(1)}%
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Recuperado: {formatCurrency(investidor.totalRecuperado)}</span>
            <span>Restante: {formatCurrency(restante)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
