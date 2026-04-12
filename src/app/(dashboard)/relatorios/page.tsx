"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { relatorios, investidor, formatCurrency, formatNumber } from "@/lib/mock-data";
import { FileText, Download, Calendar, DollarSign, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RelatoriosPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Histórico completo de prestações de contas mensais
        </p>
      </div>

      <div className="space-y-4">
        {relatorios.map((rel) => (
          <Card
            key={rel.id}
            className="border-border/50 transition-all hover:border-vertus-orange/30"
          >
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-vertus-orange/10">
                    <FileText className="h-6 w-6 text-vertus-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{rel.mesReferencia}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Pagamento: {rel.mesPagamento}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        Resultado: {formatCurrency(rel.resultadoLiquido)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        Geração: {formatNumber(rel.geracaoTotal)} kWh
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {rel.clientes.length} clientes
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-lg font-bold text-vertus-orange">
                      {formatCurrency(rel.resultadoLiquido)}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-500/10 text-emerald-500"
                    >
                      {rel.percentualVendido}% vendido
                    </Badge>
                  </div>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumo acumulado */}
      <Card className="border-vertus-orange/20 bg-vertus-orange/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Resumo Acumulado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-xs text-muted-foreground">Total Recebido</p>
              <p className="text-lg font-bold text-vertus-orange">
                {formatCurrency(
                  relatorios.reduce((acc, r) => acc + r.resultadoLiquido, 0)
                )}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Receita Total</p>
              <p className="text-lg font-bold">
                {formatCurrency(
                  relatorios.reduce((acc, r) => acc + r.receitaBruta, 0)
                )}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Geração Total</p>
              <p className="text-lg font-bold">
                {formatNumber(
                  relatorios.reduce((acc, r) => acc + r.geracaoTotal, 0)
                )}{" "}
                kWh
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Relatórios</p>
              <p className="text-lg font-bold">{relatorios.length} meses</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
