"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { relatorios, formatCurrency, formatNumber } from "@/lib/mock-data";
import { Sun, Gauge, Receipt, MapPin, Zap, Activity } from "lucide-react";

export default function UsinasPage() {
  const ultimoRelatorio = relatorios[0];
  const usinas = ultimoRelatorio.usinas;
  const potenciaTotal = usinas.reduce((a, u) => a + u.potenciaKwp, 0);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Usinas</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Dados técnicos e operacionais das usinas solares
        </p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vertus-orange/10">
                <Sun className="h-5 w-5 text-vertus-orange" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Usinas Ativas</p>
                <p className="text-xl font-bold">{usinas.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Gauge className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Potência Total</p>
                <p className="text-xl font-bold">{potenciaTotal} kWp</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Geração Último Mês</p>
                <p className="text-xl font-bold">{formatNumber(ultimoRelatorio.geracaoTotal)} kWh</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards individuais por usina */}
      <div className="grid gap-6 md:grid-cols-2">
        {usinas.map((usina) => (
          <Card key={usina.id} className="border-border/50 transition-all hover:border-vertus-orange/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-vertus-orange/10">
                    <Sun className="h-6 w-6 text-vertus-orange" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">{usina.nome}</CardTitle>
                    <p className="text-xs text-muted-foreground">Aracoiaba, CE</p>
                  </div>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-500 border-0">
                  Operacional
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border/50 p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Gauge className="h-3.5 w-3.5" />
                    Potência
                  </div>
                  <p className="mt-1 text-lg font-semibold">{usina.potenciaKwp} kWp</p>
                </div>
                <div className="rounded-lg border border-border/50 p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Zap className="h-3.5 w-3.5" />
                    Tarifa ENEL
                  </div>
                  <p className="mt-1 text-lg font-semibold">R$ {usina.tarifaEnel.toFixed(2)}/kWh</p>
                </div>
                <div className="rounded-lg border border-border/50 p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Receipt className="h-3.5 w-3.5" />
                    Taxa Mínima
                  </div>
                  <p className="mt-1 text-lg font-semibold">{formatCurrency(usina.taxaMinima)}</p>
                </div>
                <div className="rounded-lg border border-border/50 p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    Medidor
                  </div>
                  <p className="mt-1 text-lg font-semibold">{usina.medidor}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabela comparativa */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">
            Comparativo de Usinas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 pr-4">Usina</th>
                  <th className="pb-3 pr-4 text-right">Potência</th>
                  <th className="pb-3 pr-4 text-right">Medidor</th>
                  <th className="pb-3 pr-4 text-right">Tarifa</th>
                  <th className="pb-3 text-right">Taxa Mínima</th>
                </tr>
              </thead>
              <tbody>
                {usinas.map((u) => (
                  <tr key={u.id} className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">{u.nome}</td>
                    <td className="py-3 pr-4 text-right">{u.potenciaKwp} kWp</td>
                    <td className="py-3 pr-4 text-right">{u.medidor}</td>
                    <td className="py-3 pr-4 text-right">R$ {u.tarifaEnel.toFixed(2)}/kWh</td>
                    <td className="py-3 text-right text-vertus-orange">{formatCurrency(u.taxaMinima)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold">
                  <td className="pt-3">Total</td>
                  <td className="pt-3 text-right">{potenciaTotal} kWp</td>
                  <td className="pt-3 text-right">{usinas.length} medidores</td>
                  <td className="pt-3 text-right">—</td>
                  <td className="pt-3 text-right text-vertus-orange">
                    {formatCurrency(usinas.reduce((a, u) => a + u.taxaMinima, 0))}
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
