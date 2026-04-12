"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Zap } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/mock-data";
import type { Cliente } from "@/lib/mock-data";

interface ClientsListProps {
  clientes: Cliente[];
}

export function ClientsList({ clientes }: ClientsListProps) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Clientes do Mês
          </CardTitle>
          <Badge
            variant="secondary"
            className="bg-vertus-orange/10 text-vertus-orange"
          >
            {clientes.length} ativos
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion className="space-y-2">
          {clientes.map((cliente) => (
            <AccordionItem
              key={cliente.id}
              className="rounded-lg border border-border/50 px-4 data-open:border-vertus-orange/30 data-open:bg-vertus-orange/5"
            >
              <AccordionTrigger className="py-3 hover:no-underline">
                <div className="flex flex-1 items-center justify-between pr-4">
                  <div className="text-left">
                    <p className="text-sm font-medium">{cliente.nome}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatNumber(cliente.consumoKwh)} kWh
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-500">
                    +{formatCurrency(cliente.lucro)}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {cliente.endereco}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-md bg-muted/50 p-2.5">
                      <p className="text-xs text-muted-foreground">Receita</p>
                      <p className="text-sm font-semibold">
                        {formatCurrency(cliente.receitaBruta)}
                      </p>
                    </div>
                    <div className="rounded-md bg-muted/50 p-2.5">
                      <p className="text-xs text-muted-foreground">
                        Custo ENEL
                      </p>
                      <p className="text-sm font-semibold text-red-400">
                        {formatCurrency(cliente.custoEnel)}
                      </p>
                    </div>
                    <div className="rounded-md bg-muted/50 p-2.5">
                      <p className="text-xs text-muted-foreground">Lucro</p>
                      <p className="text-sm font-semibold text-emerald-500">
                        {formatCurrency(cliente.lucro)}
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
