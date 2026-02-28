"use client";

import { useRouter } from "next/navigation";
import { useAgendarCita } from "../context";
import { useEffect } from "react";
import { ROUTES } from "@/lib/routes";

export default function MascotaPage() {
  const router = useRouter();

  const {
    service,
    email,
    especie,
    setEspecie,
    nombreMascota,
    setNombreMascota,
    raza,
    setRaza,
  } = useAgendarCita();

  // 🔒 Bloqueo si no viene de paso 2
  useEffect(() => {
    if (!service || !email) {
      router.replace(ROUTES.PUBLIC.AGENDAR_CITA_SERVICIO);
    }
  }, [service, email, router]);

  const handleSelectEspecie = (tipo: "perro" | "gato") => {
    setEspecie(tipo);
    setNombreMascota("");
    setRaza("");
  };

  const isValid =
    especie &&
    nombreMascota.trim() !== "" &&
    raza.trim() !== "";

  return (
    <>
      <h1 className="text-2xl font-semibold text-[#1E293B] mb-2 text-center">
        ¿Quién es el paciente?
      </h1>

      <p className="text-sm text-[#64748B] text-center mb-8">
        Selecciona la especie y completa los datos.
      </p>

      {/* Selección especie */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div
          onClick={() => handleSelectEspecie("perro")}
          className={`p-6 border rounded-2xl text-center cursor-pointer transition-all
            ${
              especie === "perro"
                ? "border-[#2F8F83] bg-[#E6F4F2]"
                : "border-gray-200 hover:border-[#2F8F83]"
            }
          `}
        >
          🐶 Perro
        </div>

        <div
          onClick={() => handleSelectEspecie("gato")}
          className={`p-6 border rounded-2xl text-center cursor-pointer transition-all
            ${
              especie === "gato"
                ? "border-[#2F8F83] bg-[#E6F4F2]"
                : "border-gray-200 hover:border-[#2F8F83]"
            }
          `}
        >
          🐱 Gato
        </div>
      </div>

      {/* Campos dinámicos */}
      {especie && (
        <div className="space-y-6">
          <input
            placeholder="Nombre de la mascota"
            value={nombreMascota}
            onChange={(e) => setNombreMascota(e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-gray-200"
          />

          <input
            placeholder="Raza"
            value={raza}
            onChange={(e) => setRaza(e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-gray-200"
          />
        </div>
      )}

      <div className="mt-10 flex justify-between">
        <button
          onClick={() => router.push(ROUTES.PUBLIC.AGENDAR_CITA_DATOS)}
          className="text-sm text-[#64748B]"
        >
          ← Volver
        </button>

        <button
          disabled={!isValid}
          onClick={() => alert("Paso 4 próximamente")}
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