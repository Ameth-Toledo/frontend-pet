"use client";

import { useRouter } from "next/navigation";
import { useAgendarCita } from "../context";

export default function ServicioPage() {
  const router = useRouter();
  const {
    service,
    setService,
    motivo,
    setMotivo,
    groomingOption,
    setGroomingOption,
  } = useAgendarCita();

  const isValid =
    (service === "chequeo" && motivo) ||
    (service === "grooming" && groomingOption);

  return (
    <>
      <h1 className="text-2xl font-semibold text-[#1E293B] text-center mb-2">
        Escoge un servicio
      </h1>

      <p className="text-sm text-[#64748B] text-center mb-10">
        Selecciona el tipo de atención que necesita tu mascota hoy.
      </p>

      <div className="space-y-6">
        <div
          onClick={() => setService("chequeo")}
          className={`border rounded-2xl p-6 cursor-pointer transition-all
          ${
            service === "chequeo"
              ? "border-[#2F8F83] bg-[#E6F4F2]"
              : "border-gray-200 hover:border-[#2F8F83]"
          }`}
        >
          Chequeo médico
          {service === "chequeo" && (
            <select
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="mt-4 w-full h-11 px-4 rounded-xl border border-gray-200"
            >
              <option value="">Motivo</option>
              <option>Vómito</option>
              <option>Diarrea</option>
              <option>Vacunación</option>
            </select>
          )}
        </div>

        <div
          onClick={() => setService("grooming")}
          className={`border rounded-2xl p-6 cursor-pointer transition-all
          ${
            service === "grooming"
              ? "border-[#2F8F83] bg-[#E6F4F2]"
              : "border-gray-200 hover:border-[#2F8F83]"
          }`}
        >
          Corte de pelo y baño
          {service === "grooming" && (
            <select
              value={groomingOption}
              onChange={(e) => setGroomingOption(e.target.value)}
              className="mt-4 w-full h-11 px-4 rounded-xl border border-gray-200"
            >
              <option value="">Selecciona opción</option>
              <option>Baño básico</option>
              <option>Corte estándar</option>
            </select>
          )}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          disabled={!isValid}
          onClick={() => router.push("/agendar-cita/datos")}
          className={`h-12 px-10 rounded-xl font-medium text-sm
          ${
            isValid
              ? "bg-[#2F8F83] text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Continuar →
        </button>
      </div>
    </>
  );
}