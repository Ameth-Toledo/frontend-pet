"use client";

import { useRouter } from "next/navigation";
import { useAgendarCita } from "../context";
import { useEffect } from "react";
import { ROUTES } from "@/lib/routes";

export default function HorarioPage() {
  const router = useRouter();

  const {
    selectedFecha,
    selectedHorario,
    setSelectedHorario,
  } = useAgendarCita();

  const fecha = selectedFecha;
  const horario = selectedHorario;
  const setHorario = setSelectedHorario;

  // 🔒 Protección de flujo
  useEffect(() => {
    if (!fecha) {
      router.replace(ROUTES.PUBLIC.AGENDAR_CITA_FECHA);
    }
  }, [fecha, router]);

  // 🧠 Si cambia la fecha, limpiamos horario seleccionado
  useEffect(() => {
    setHorario(null);
  }, [fecha, setHorario]);

  const horariosDisponibles = [
    "09:00 - 09:30",
    "09:30 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:00",
    "11:00 - 11:30",
    "12:00 - 12:30",
    "15:00 - 15:30",
    "15:30 - 16:00",
    "16:00 - 16:30",
    "16:30 - 17:00",
    "17:00 - 17:30",
    "17:30 - 18:00",
  ];

  const isValid = Boolean(horario);

  return (
    <>
      <h1 className="text-2xl font-semibold text-[#1E293B] text-center mb-2">
        Elegir horario
      </h1>

      <p className="text-sm text-[#64748B] text-center mb-10">
        Selecciona un horario disponible para el día elegido.
      </p>

      {/* Fecha seleccionada */}
      <div className="mb-6 text-center text-sm text-[#2F8F83] font-medium">
        Fecha seleccionada: {fecha}
      </div>

      {/* Grid horarios */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {horariosDisponibles.map((hora) => (
          <button
            key={hora}
            type="button"
            onClick={() => setHorario(hora)}
            className={`h-11 rounded-xl text-sm font-medium transition-all duration-200
              ${
                horario === hora
                  ? "bg-[#2F8F83] text-white shadow-md"
                  : "bg-gray-100 hover:bg-[#E6F4F2]"
              }
            `}
          >
            {hora}
          </button>
        ))}
      </div>

      {/* Botones navegación */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => router.push(ROUTES.PUBLIC.AGENDAR_CITA_FECHA)}
          className="text-sm text-[#64748B] hover:text-[#1E293B] transition"
        >
          ← Volver
        </button>

        <button
          type="button"
          disabled={!isValid}
          onClick={() =>
            router.push(ROUTES.PUBLIC.AGENDAR_CITA_RESUMEN)
          }
          className={`h-12 px-10 rounded-xl font-medium text-sm transition-all
            ${
              isValid
                ? "bg-[#2F8F83] text-white hover:bg-[#287A70]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          Continuar →
        </button>
      </div>
    </>
  );
}