import { ReactNode } from "react";
import SidebarCliente from "@/components/layout/SidebarCliente";

export default function ClienteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarCliente />
      <main className="flex-1">{children}</main>
    </div>
  );
}
