"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Gauge, Receipt } from "lucide-react";
import { formatCurrency } from "@/lib/mock-data";
import type { Usina } from "@/lib/mock-data";

interface PlantDetailsProps {
  usinas: Usina[];
}

export function PlantDetails({ usinas }: PlantDetailsProps) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">
          Dados Técnicos das Usinas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {usinas.map((usina) => (
            <div
              key={usina.id}
              className="rounded-lg border border-border/50 p-4 transition-colors hover:border-vertus-orange/30"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vertus-orange/10">
                    <Sun className="h-4 w-4 text-vertus-orange" />
                  </div>
                  <span className="text-sm font-semibold">{usina.nome}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {usina.medidor}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Gauge className="h-3.5 w-3.5" />
                    Potência
                  </span>
                  <span className="font-medium">{usina.potenciaKwp} kWp</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Receipt className="h-3.5 w-3.5" />
                    Taxa Mínima
                  </span>
                  <span className="font-medium">
                    {formatCurrency(usina.taxaMinima)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tarifa ENEL</span>
                  <span className="font-medium">
                    R$ {usina.tarifaEnel.toFixed(2)}/kWh
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
