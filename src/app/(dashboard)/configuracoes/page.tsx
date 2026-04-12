"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { investidor } from "@/lib/mock-data";
import { User, Mail, MapPin, Shield, Bell, Palette, Lock } from "lucide-react";

export default function ConfiguracoesPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerencie seu perfil e preferências
        </p>
      </div>

      {/* Perfil */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Perfil do Investidor</CardTitle>
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500">
              Ativo
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vertus-orange text-xl font-bold text-white">
              {investidor.nome.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{investidor.nome}</h3>
              <p className="text-sm text-muted-foreground">Investidor</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Email:</span>
              <span>{investidor.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Localização:</span>
              <span>{investidor.localizacao}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Membro desde:</span>
              <span>{new Date(investidor.dataInicio).toLocaleDateString("pt-BR")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notificações */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Bell className="h-4 w-4 text-vertus-orange" />
            Notificações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Novo relatório disponível", desc: "Receba um aviso quando o relatório mensal for publicado", enabled: true },
            { label: "Resumo semanal", desc: "Receba um resumo semanal por email", enabled: false },
            { label: "Alertas de geração", desc: "Aviso se a geração cair abaixo do esperado", enabled: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-lg border border-border/50 p-4">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <div
                className={`flex h-6 w-11 cursor-pointer items-center rounded-full px-1 transition-colors ${
                  item.enabled ? "bg-vertus-orange" : "bg-muted"
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full bg-white transition-transform ${
                    item.enabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Segurança */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Lock className="h-4 w-4 text-vertus-orange" />
            Segurança
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-border/50 p-4">
            <div>
              <p className="text-sm font-medium">Alterar Senha</p>
              <p className="text-xs text-muted-foreground">Última alteração: nunca</p>
            </div>
            <Button variant="outline" size="sm">
              Alterar
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border/50 p-4">
            <div>
              <p className="text-sm font-medium">Autenticação em 2 Fatores</p>
              <p className="text-xs text-muted-foreground">Adicione uma camada extra de segurança</p>
            </div>
            <Button variant="outline" size="sm">
              Ativar
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
