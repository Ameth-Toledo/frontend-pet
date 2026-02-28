"use client";

import { useState } from "react";

type ServiceType = "chequeo" | "grooming" | null;

export default function AgendarCitaPage() {
  const [selectedService, setSelectedService] = useState<ServiceType>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [groomingOption, setGroomingOption] = useState("");

  const motivosConsulta = [
    "Vómito",
    "Diarrea",
    "Diarrea con sangre",
    "Se comió algo que no debía",
    "Se siente cansado",
    "Vacunación",
    "Seguimiento rutinario",
    "Desparasitación",
  ];

  const groomingOptions = [
    "Baño básico",
    "Baño + corte estándar",
    "Corte según raza",
    "Estilo creativo",
    "Tijera completo",
    "Deslanado y cepillado profundo",
  ];

  return (
    <div className="min-h-screen bg-[#F6F7F5] py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] p-12">

        {/* Step indicator */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div
                key={step}
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  step === 1
                    ? "bg-[#2F8F83] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-[#1E293B] text-center mb-2">
          Escoge un servicio
        </h1>

        <p className="text-sm text-[#64748B] text-center mb-10">
          Selecciona el tipo de atención que necesita tu mascota hoy.
        </p>

        {/* Chequeo Médico */}
        <div
          onClick={() => {
            setSelectedService("chequeo");
            setIsExpanded(true);
          }}
          className={`border rounded-2xl p-6 mb-6 cursor-pointer transition-all duration-200
          ${
            selectedService === "chequeo"
              ? "border-[#2F8F83] bg-[#E6F4F2]"
              : "border-gray-200 hover:border-[#2F8F83]"
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-[#1E293B]">
                Chequeo médico
              </h3>
              <p className="text-sm text-[#64748B]">
                Consulta general y revisión.
              </p>
            </div>

            <div
              className={`h-5 w-5 rounded-full border-2 flex items-center justify-center
              ${
                selectedService === "chequeo"
                  ? "border-[#2F8F83]"
                  : "border-gray-300"
              }`}
            >
              {selectedService === "chequeo" && (
                <div className="h-2.5 w-2.5 bg-[#2F8F83] rounded-full"></div>
              )}
            </div>
          </div>

          {/* Desplegable */}
          {selectedService === "chequeo" && isExpanded && (
            <div className="mt-6 border-t pt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-[#1E293B] block mb-2">
                  Motivo de la consulta
                </label>
                <select
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2F8F83]"
                >
                  <option value="">Selecciona un motivo</option>
                  {motivosConsulta.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-[#1E293B] block mb-2">
                  Descripción
                </label>
                <textarea
                  placeholder="Describe brevemente lo que ha notado en tu mascota."
                  className="w-full rounded-xl border border-gray-200 p-4 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#2F8F83]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Grooming */}
        <div
          onClick={() => {
            setSelectedService("grooming");
            setIsExpanded(false);
          }}
          className={`border rounded-2xl p-6 mb-8 cursor-pointer transition-all duration-200
          ${
            selectedService === "grooming"
              ? "border-[#2F8F83] bg-[#E6F4F2]"
              : "border-gray-200 hover:border-[#2F8F83]"
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-[#1E293B]">
                Corte de pelo y baño
              </h3>
              <p className="text-sm text-[#64748B]">
                Estética y limpieza profesional.
              </p>
            </div>

            <div
              className={`h-5 w-5 rounded-full border-2 flex items-center justify-center
              ${
                selectedService === "grooming"
                  ? "border-[#2F8F83]"
                  : "border-gray-300"
              }`}
            >
              {selectedService === "grooming" && (
                <div className="h-2.5 w-2.5 bg-[#2F8F83] rounded-full"></div>
              )}
            </div>
          </div>

          {selectedService === "grooming" && (
            <div className="mt-6 border-t pt-6">
              <select
                value={groomingOption}
                onChange={(e) => setGroomingOption(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2F8F83]"
              >
                <option value="">Selecciona una opción</option>
                {groomingOptions.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Continuar */}
        <div className="flex justify-center">
          <button
            disabled={!selectedService}
            className={`h-12 px-10 rounded-xl font-medium text-sm transition-all duration-200
            ${
              selectedService
                ? "bg-[#2F8F83] text-white hover:bg-[#287A70]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continuar →
          </button>
        </div>
      </div>
    </div>
  );
}