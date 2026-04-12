"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  TrendingUp,
  Zap,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; positive: boolean };
}

function KpiCard({ title, value, subtitle, icon, trend }: KpiCardProps) {
  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card transition-all hover:border-vertus-orange/30 hover:shadow-lg hover:shadow-vertus-orange/5">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {title}
            </p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
            {trend && (
              <div
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                  trend.positive
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-red-500/10 text-red-500"
                )}
              >
                {trend.positive ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {trend.value}%
              </div>
            )}
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-vertus-orange/10 text-vertus-orange">
            {icon}
          </div>
        </div>
      </CardContent>
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-vertus-orange to-vertus-orange/50 transition-all duration-300 group-hover:w-full" />
    </Card>
  );
}

interface KpiCardsProps {
  resultadoLiquido: number;
  receitaBruta: number;
  geracaoTotal: number;
  percentualVendido: number;
  energiaVendidaKwh: number;
  energiaDisponivelKwh: number;
}

export function KpiCards({
  resultadoLiquido,
  receitaBruta,
  geracaoTotal,
  percentualVendido,
  energiaVendidaKwh,
  energiaDisponivelKwh,
}: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        title="Resultado Líquido"
        value={formatCurrency(resultadoLiquido)}
        icon={<DollarSign className="h-5 w-5" />}
        trend={{ value: 3.2, positive: true }}
      />
      <KpiCard
        title="Receita Bruta"
        value={formatCurrency(receitaBruta)}
        icon={<TrendingUp className="h-5 w-5" />}
        trend={{ value: 2.3, positive: true }}
      />
      <KpiCard
        title="Geração Total"
        value={`${formatNumber(geracaoTotal)} kWh`}
        icon={<Zap className="h-5 w-5" />}
        trend={{ value: 4.2, positive: true }}
      />
      <KpiCard
        title="Energia Vendida"
        value={`${percentualVendido}%`}
        subtitle={`${formatNumber(energiaVendidaKwh)} de ${formatNumber(energiaDisponivelKwh)} kWh`}
        icon={<BarChart3 className="h-5 w-5" />}
      />
    </div>
  );
}
