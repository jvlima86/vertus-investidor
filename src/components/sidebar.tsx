"use client";

import {
  BarChart3,
  FileText,
  Home,
  Settings,
  Sun,
  Users,
  Wallet,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Visão Geral", href: "/", icon: Home },
  { label: "Relatórios", href: "/relatorios", icon: FileText },
  { label: "Financeiro", href: "/financeiro", icon: Wallet },
  { label: "Energia", href: "/energia", icon: Sun },
  { label: "Clientes", href: "/clientes", icon: Users },
  { label: "Projeções", href: "/projecoes", icon: TrendingUp },
  { label: "Usinas", href: "/usinas", icon: BarChart3 },
];

const bottomItems = [
  { label: "Configurações", href: "/configuracoes", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col bg-card pt-4">
      <div className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-vertus-orange/10 text-vertus-orange"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="border-t border-border px-3 py-3">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-vertus-orange/10 text-vertus-orange"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
