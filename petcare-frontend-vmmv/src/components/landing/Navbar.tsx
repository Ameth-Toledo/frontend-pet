"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link href="#inicio" className="text-xl font-semibold text-gray-900">
          Pet<span className="text-emerald-600">Care</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-600">
          <Link href="#inicio" className="hover:text-emerald-600 transition">
            Inicio
          </Link>
          <Link href="#servicios" className="hover:text-emerald-600 transition">
            Servicios
          </Link>
          <Link href="#como-funciona" className="hover:text-emerald-600 transition">
            Cómo funciona
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Acceso Cliente
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm"
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    </header>
  );
}