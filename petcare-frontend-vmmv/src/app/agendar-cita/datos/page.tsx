"use client";

import { useRouter } from "next/navigation";
import { useAgendarCita } from "../context";
import { useEffect } from "react";
import { ROUTES } from "@/lib/routes";

export default function DatosPage() {
  const router = useRouter();

  const {
    service,
    email,
    setEmail,
    nombre,
    setNombre,
    apellido,
    setApellido,
    telefono,
    setTelefono,
  } = useAgendarCita();

  useEffect(() => {
    if (!service) {
      router.replace(ROUTES.PUBLIC.AGENDAR_CITA_SERVICIO);
    }
  }, [service, router]);

  const isValid =
    email.trim() !== "" &&
    nombre.trim() !== "" &&
    apellido.trim() !== "" &&
    telefono.trim().length >= 8;

  return (
    <>
      <h1 className="text-2xl font-semibold text-[#1E293B] mb-6">
        Tus datos
      </h1>

      <div className="space-y-6">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-11 px-4 rounded-xl border border-gray-200"
        />

        <div className="grid md:grid-cols-2 gap-6">
          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="h-11 px-4 rounded-xl border border-gray-200"
          />

          <input
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="h-11 px-4 rounded-xl border border-gray-200"
          />
        </div>

        <input
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) =>
            setTelefono(e.target.value.replace(/[^0-9]/g, ""))
          }
          className="w-full h-11 px-4 rounded-xl border border-gray-200"
        />
      </div>

      <div className="mt-10 flex justify-between">
        <button
          onClick={() => router.push(ROUTES.PUBLIC.AGENDAR_CITA_SERVICIO)}
          className="text-sm text-[#64748B]"
        >
          ← Volver
        </button>

        <button
          disabled={!isValid}
          onClick={() =>
            router.push(ROUTES.PUBLIC.AGENDAR_CITA_MASCOTA)
          }
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