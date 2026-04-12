"use client";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { investidor } from "@/lib/mock-data";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden w-64 shrink-0 border-r border-border md:block">
        <div className="flex h-full flex-col">
          <Sidebar />
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header investorName={investidor.nome} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
