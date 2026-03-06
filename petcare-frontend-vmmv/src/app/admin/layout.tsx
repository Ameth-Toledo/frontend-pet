import { ReactNode } from "react";
import SidebarAdmin from "@/components/layout/SidebarAdmin";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50" style={{ backgroundColor: "#F7F9FB" }}>
      <SidebarAdmin />
      <main className="flex-1">{children}</main>
    </div>
  );
}
