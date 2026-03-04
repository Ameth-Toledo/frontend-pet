import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyringe } from "@fortawesome/free-solid-svg-icons";

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
            href={ROUTES.PUBLIC.AGENDAR_CITA}
            className="h-12 px-8 rounded-xl bg-[#2F8F83] text-white font-medium shadow-lg hover:bg-[#287A70] transition-all duration-300 inline-flex items-center justify-center"
          >
            Agendar Cita
          </Link>
        </div>

        <div className="flex justify-center">
          <div className="relative bg-[#2F8F83] rounded-[32px] p-10 w-[480px] h-[600px] shadow-[0_35px_80px_-15px_rgba(47,143,131,0.5)] flex items-center justify-center">
            <div className="w-[360px] h-[460px] bg-white/10 rounded-2xl flex items-center justify-center text-white/70 text-sm">
              <img src="https://www.petco.com.mx/medias/Perro-result.webp?context=bWFzdGVyfHJvb3R8MzExNDh8aW1hZ2Uvd2VicHxhRFEwTDJnd05pOHhNVE0xTmpBMk1UY3lPRGM1T0M5UVpYSnliMTl5WlhOMWJIUXVkMlZpY0F8ZmY0NmYzOTE3MjI5YmM3YjBlNzY0YjQ0MzNlNGQyNTcyZmIzN2MxZTk2ZGQwMzU1NmUwNjJjYzhjNDAyYWZjZg" alt="" />
            </div>

            <div className="absolute -bottom-8 left-10 bg-white rounded-2xl px-6 py-5 shadow-xl w-[260px]">
              <div className="flex items-center gap-3 mb-2">
                  <FontAwesomeIcon icon={faSyringe} style={{color: "rgb(47, 143, 131)",fontSize:40}} />
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