import { ReactNode } from "react";
import SidebarVeterinario from "@/components/layout/SidebarVeterinario";

export default function VeterinarioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarVeterinario />
      <main className="flex-1">{children}</main>
    </div>
  );
}
