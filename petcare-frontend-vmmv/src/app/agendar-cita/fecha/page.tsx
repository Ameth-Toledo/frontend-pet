"use client";

import { useRouter } from "next/navigation";
import { useAgendarCita } from "../context";
import { useEffect } from "react";
import { ROUTES } from "@/lib/routes";

export default function FechaPage() {
  const router = useRouter();
  const { especie, fecha, setFecha } = useAgendarCita();

  useEffect(() => {
    if (!especie) {
      router.replace(ROUTES.PUBLIC.AGENDAR_CITA_MASCOTA);
    }
  }, [especie, router]);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const isValid = !!fecha;

  return (
    <>
      <h1 className="text-2xl font-semibold text-[#1E293B] text-center mb-2">
        Elegir día
      </h1>

      <p className="text-sm text-[#64748B] text-center mb-10">
        Selecciona la fecha para tu cita.
      </p>

      <div className="grid grid-cols-7 gap-3 mb-10">
        {days.map((day) => {
          const value = `2024-02-${day.toString().padStart(2, "0")}`;

          return (
            <button
              key={day}
              onClick={() => setFecha(value)}
              className={`h-12 rounded-xl text-sm font-medium transition
                ${
                  fecha === value
                    ? "bg-[#2F8F83] text-white"
                    : "bg-gray-100 hover:bg-[#E6F4F2]"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {!fecha && (
        <div className="mb-6 text-sm text-red-500 text-center">
          Selecciona una fecha para continuar.
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => router.push(ROUTES.PUBLIC.AGENDAR_CITA_MASCOTA)}
          className="text-sm text-[#64748B]"
        >
          ← Volver
        </button>

        <button
          disabled={!isValid}
          className={`h-12 px-10 rounded-xl font-medium text-sm
            ${
              isValid
                ? "bg-[#2F8F83] text-white"
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