"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { relatorios, formatCurrency, formatNumber } from "@/lib/mock-data";
import { Users, MapPin, Zap, DollarSign, TrendingUp } from "lucide-react";

export default function ClientesPage() {
  const ultimoRelatorio = relatorios[0];
  const clientes = ultimoRelatorio.clientes;

  const totalLucro = clientes.reduce((a, c) => a + c.lucro, 0);
  const totalConsumo = clientes.reduce((a, c) => a + c.consumoKwh, 0);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Clientes</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Detalhamento de consumo e receita por cliente — {ultimoRelatorio.mesReferencia}
        </p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vertus-orange/10">
                <Users className="h-5 w-5 text-vertus-orange" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Clientes Ativos</p>
                <p className="text-xl font-bold">{clientes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <DollarSign className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Lucro Total</p>
                <p className="text-xl font-bold text-emerald-500">{formatCurrency(totalLucro)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Zap className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Consumo Total</p>
                <p className="text-xl font-bold">{formatNumber(totalConsumo)} kWh</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards individuais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clientes
          .sort((a, b) => b.lucro - a.lucro)
          .map((cliente, i) => {
            const lucroPct = ((cliente.lucro / totalLucro) * 100).toFixed(1);
            return (
              <Card
                key={cliente.id}
                className="border-border/50 transition-all hover:border-vertus-orange/30"
              >
                <CardContent className="p-5">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-vertus-orange/10 text-xs font-bold text-vertus-orange">
                          {i + 1}
                        </span>
                        <h3 className="font-semibold">{cliente.nome}</h3>
                      </div>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {cliente.endereco}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-vertus-orange/10 text-vertus-orange"
                    >
                      {lucroPct}% do lucro
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">Consumo</p>
                      <p className="text-sm font-semibold">
                        {formatNumber(cliente.consumoKwh)} kWh
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">Receita</p>
                      <p className="text-sm font-semibold">
                        {formatCurrency(cliente.receitaBruta)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">Custo ENEL</p>
                      <p className="text-sm font-semibold text-red-400">
                        {formatCurrency(cliente.custoEnel)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">Lucro</p>
                      <p className="text-sm font-semibold text-emerald-500">
                        {formatCurrency(cliente.lucro)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </>
  );
}
