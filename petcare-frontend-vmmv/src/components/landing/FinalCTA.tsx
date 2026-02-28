import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-[#F6F7F5] py-32">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="bg-[#2F8F83] rounded-[32px] py-24 px-10 text-center shadow-[0_30px_80px_-15px_rgba(47,143,131,0.45)]">
          <h2 className="text-[30px] lg:text-[34px] font-semibold text-white mb-6">
            ¿Listo para brindarle el mejor cuidado?
          </h2>

          <p className="text-sm lg:text-base text-white/90 max-w-xl mx-auto leading-relaxed mb-12">
            Lleva el seguimiento de tu mascota más allá de la consulta.
            Organiza indicaciones, controla citas y mantente informado
            en todo momento.
          </p>

          <Link
            href="/ElegirServicio"
            className="h-12 px-10 rounded-xl bg-white text-[#2F8F83] font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center"
          >
            Agendar cita de seguimiento
          </Link>
        </div>
      </div>
    </section>
  );
}