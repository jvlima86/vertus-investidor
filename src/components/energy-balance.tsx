"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatNumber } from "@/lib/mock-data";
import type { Cliente } from "@/lib/mock-data";

interface EnergyBalanceProps {
  percentualVendido: number;
  excedenteKwh: number;
  energiaVendidaKwh: number;
  clientes: Cliente[];
}

export function EnergyBalance({
  percentualVendido,
  excedenteKwh,
  energiaVendidaKwh,
  clientes,
}: EnergyBalanceProps) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">
          Balanço de Energia
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Aproveitamento</span>
            <span className="font-semibold text-vertus-orange">
              {percentualVendido}% vendida
            </span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-vertus-orange to-vertus-orange/70 transition-all duration-1000"
              style={{ width: `${percentualVendido}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatNumber(energiaVendidaKwh)} kWh vendidos</span>
            <span>{formatNumber(excedenteKwh)} kWh excedente</span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Distribuição por Cliente
          </p>
          {clientes.map((cliente) => (
            <div key={cliente.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="truncate pr-2">{cliente.nome}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatNumber(cliente.consumoKwh)} kWh ({cliente.percentual}%)
                </span>
              </div>
              <Progress
                value={cliente.percentual}
                className="h-1.5 [&>div]:bg-vertus-orange"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
