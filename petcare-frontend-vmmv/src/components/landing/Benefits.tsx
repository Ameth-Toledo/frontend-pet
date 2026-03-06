"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
export default function Benefits() {
  return (
    <section className="bg-[#F6F7F5] py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-[28px] lg:text-[32px] font-semibold text-[#1E293B] tracking-tight">
            Todo lo que necesitas para cuidar mejor a tu mascota
          </h2>
          <p className="text-base text-[#64748B] mt-4 max-w-2xl mx-auto leading-relaxed">
            Diseñado para simplificar el seguimiento médico y organizar
            información importante en un solo lugar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="group rounded-[24px] bg-white p-8 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="h-12 w-12 rounded-xl mb-6 flex items-center justify-center">
              <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#2f8f83", width: 40, height: 40 }} />
            </div>
            <h3 className="text-lg font-semibold text-[#1E293B] mb-3">
              Historial centralizado
            </h3>
            <p className="text-base text-[#64748B] leading-relaxed">
              Guarda consultas, diagnósticos y tratamientos en un
              entorno organizado y siempre accesible.
            </p>
          </div>

          <div className="group rounded-[24px] bg-white p-8 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="h-12 w-12 rounded-xl mb-6 flex items-center justify-center">
              <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#2f8f83", width: 40, height: 40 }} />
            </div>
            <h3 className="text-lg font-semibold text-[#1E293B] mb-3">
              Recordatorios inteligentes
            </h3>
            <p className="text-base text-[#64748B] leading-relaxed">
              Recibe alertas para vacunas, desparasitaciones y citas
              importantes sin depender de notas externas.
            </p>
          </div>

          <div className="group rounded-[24px] bg-white p-8 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="h-12 w-12 rounded-xl mb-6 flex items-center justify-center">
              <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#2f8f83", width: 40, height: 40 }} />
            </div>
            <h3 className="text-lg font-semibold text-[#1E293B] mb-3">
              Seguimiento post-consulta
            </h3>
            <p className="text-base text-[#64748B] leading-relaxed">
              Mantén control del progreso después de cada visita
              veterinaria con notas claras y estructuradas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
