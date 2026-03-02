"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
      pathname === path
        ? "bg-emerald-600 text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen p-6">
      <div className="mb-10 text-lg font-semibold">
        Pet<span className="text-emerald-600">Care</span>
      </div>

      <nav className="space-y-3">
        <Link href="/cliente/dashboard" className={linkClass("/cliente/dashboard")}>
          Panel principal
        </Link>

        <Link href="/cliente/miscitas" className={linkClass("/cliente/miscitas")}>
          Mis Citas
        </Link>

        <Link href="/cliente/mismascotas" className={linkClass("/cliente/mismascotas")}>
          Mis mascotas
        </Link>

        <Link href="/cliente/configuracion" className={linkClass("/cliente/configuracion")}>
          Configuración
        </Link>
      </nav>
    </aside>
  );
}