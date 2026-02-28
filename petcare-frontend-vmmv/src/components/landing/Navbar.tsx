import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-[#F6F7F5]">
      <div className="max-w-[1200px] mx-auto px-6 py-8 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-[#1E293B]"
        >
          Pet<span className="text-[#2F8F83]">Care</span>
        </Link>

        <nav className="hidden md:flex items-center gap-12 text-sm text-[#64748B]">
          <Link href="/">Inicio</Link>
          <Link href="#servicios">Servicios</Link>
          <Link href="#como-funciona">Cómo funciona</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/register"
            className="h-12 px-6 rounded-xl bg-[#2F8F83] text-white font-medium text-sm flex items-center justify-center hover:bg-[#287A70] transition-all duration-300"
          >
            Regístrate
          </Link>

          <Link
            href="/login"
            className="h-12 px-6 rounded-xl border border-[#2F8F83] text-[#2F8F83] font-medium text-sm flex items-center justify-center hover:bg-[#2F8F83] hover:text-white transition-all duration-300"
          >
            Acceso Cliente
          </Link>
        </div>
      </div>
    </header>
  );
}