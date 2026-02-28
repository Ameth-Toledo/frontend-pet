import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#F6F7F5] pt-32 pb-40">
      <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-28 items-center">
        <div className="space-y-12">
          <p className="text-sm text-[#6FB3A8] font-medium tracking-wide uppercase">
            Plataforma de seguimiento
          </p>

          <h1 className="text-[44px] lg:text-[56px] leading-[1.1] font-semibold text-[#1E293B]">
            El cuidado de tu mascota no termina en la{" "}
            <span className="text-[#2F8F83]">consulta</span>
          </h1>

          <p className="text-base text-[#64748B] max-w-md leading-relaxed">
            Seguimiento personalizado y profesional después de cada visita
            para garantizar el bienestar total de tu compañero.
          </p>

          <Link
            href="/ElegirServicio"
            className="h-12 px-8 rounded-xl bg-[#2F8F83] text-white font-medium shadow-lg hover:bg-[#287A70] transition-all duration-300 inline-flex items-center justify-center"
          >
            Agendar cita de seguimiento
          </Link>
        </div>

        <div className="flex justify-center">
          <div className="relative bg-[#2F8F83] rounded-[32px] p-10 w-[480px] h-[600px] shadow-[0_35px_80px_-15px_rgba(47,143,131,0.5)] flex items-center justify-center">
            <div className="w-[360px] h-[460px] bg-white/10 rounded-2xl flex items-center justify-center text-white/70 text-sm">
              Imagen próximamente
            </div>

            <div className="absolute -bottom-8 left-10 bg-white rounded-2xl px-6 py-5 shadow-xl w-[260px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-3 w-3 rounded-full bg-[#2F8F83]"></div>
                <p className="text-sm font-semibold text-[#1E293B]">
                  Vacuna 2026
                </p>
              </div>
              <p className="text-xs text-[#64748B]">
                Seguimiento activo programado
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}