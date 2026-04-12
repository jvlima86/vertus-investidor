"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, ChevronDown } from "lucide-react";
import type { RelatorioMensal } from "@/lib/mock-data";

interface PeriodSelectorProps {
  relatorios: RelatorioMensal[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function PeriodSelector({
  relatorios,
  selectedId,
  onSelect,
}: PeriodSelectorProps) {
  const selected = relatorios.find((r) => r.id === selectedId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted">
        <Calendar className="h-4 w-4" />
        <span>{selected?.mesReferencia ?? "Selecionar período"}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {relatorios.map((r) => (
          <DropdownMenuItem key={r.id} onClick={() => onSelect(r.id)}>
            <div>
              <p className="text-sm font-medium">{r.mesReferencia}</p>
              <p className="text-xs text-muted-foreground">
                Pgto: {r.mesPagamento}
              </p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
