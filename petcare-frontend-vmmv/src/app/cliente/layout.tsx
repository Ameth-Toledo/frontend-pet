import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function ClienteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}