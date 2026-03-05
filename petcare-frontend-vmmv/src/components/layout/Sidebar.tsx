"use client";

import { faBone, faBriefcaseMedical, faGear, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${pathname === path
      ? "bg-emerald-600 text-white"
      : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen p-6">
      <Link href="/" className="block mb-10 text-lg font-semibold">
        Pet<span className="text-emerald-600">Care</span>
      </Link>

      <nav className="space-y-3">

        <Link
          href="/cliente/dashboard"
          className={`flex items-center gap-2 ${linkClass("/cliente/dashboard")
            }`}
        >
          <FontAwesomeIcon icon={faTable} className="w-5 h-5 flex-shrink-0" />
          <span>Panel principal</span>
        </Link>

        <Link href="/cliente/miscitas" className={`flex items-center gap-2 ${linkClass("/cliente/miscitas")
          }`}
        >
          <FontAwesomeIcon icon={faBriefcaseMedical} className="w-5 h-5 flex-shrink-0" />
          Mis Citas
        </Link>

        <Link href="/cliente/mismascotas" className={`flex items-center gap-2 ${linkClass("/cliente/mismascotas")
          }`}
        >
          <FontAwesomeIcon icon={faBone} className="w-5 h-5 flex-shrink-0"/>
          Mis mascotas
        </Link>

        <Link href="/cliente/configuracion" className={`flex items-center gap-2 ${linkClass("/cliente/configuracion")
          }`}
        >
          <FontAwesomeIcon icon={faGear} className="w-5 h-5 flex-shrink-0"/>
          Configuración
        </Link>
      </nav>
    </aside>
  );
}
