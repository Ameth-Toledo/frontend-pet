"use client";

import { useState, useEffect } from "react";
import { useAgendarCita } from "../context";
import { useMascotaViewModel } from "@/modules/citas/viewmodel/MascotaViewModel";

export default function MascotaPage() {
  const {
    email,
    especie: contextEspecie,
    setEspecie: setContextEspecie,
    nombreMascota: contextNombreMascota,
    setNombreMascota: setContextNombreMascota,
    raza: contextRaza,
    setRaza: setContextRaza,
  } = useAgendarCita();

  const viewModel = useMascotaViewModel(email);

  const [especie, setEspecie] = useState(contextEspecie || "");
  const [nombreMascota, setNombreMascota] = useState(contextNombreMascota || "");
  const [raza, setRaza] = useState(contextRaza || "");

  useEffect(() => {
    if (especie) {
      const especieId = especie === "perro" ? 1 : 2;
      viewModel.loadRazas(especieId);
    }
  }, [especie]);

  const handleEspecieSelect = (selectedEspecie: string) => {
    setEspecie(selectedEspecie);
    setRaza("");
  };

  const handleContinue = () => {
    const saveToContext = (esp: string, nom: string, raz: string) => {
      setContextEspecie(esp);
      setContextNombreMascota(nom);
      setContextRaza(raz);
    };

    viewModel.continuar(especie, nombreMascota, raza, saveToContext);
  };

  const isValid = viewModel.validateForm(especie, nombreMascota, raza);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">NUEVA CITA</p>
        <h1 className="text-3xl font-bold text-gray-900">Datos de tu mascota</h1>
      </div>

      <div className="space-y-6">
        {/* Selector de Especie */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Especie*
          </label>
          <div className="grid grid-cols-2 gap-4">
            {/* PERRO */}
            <button
              type="button"
              onClick={() => handleEspecieSelect("perro")}
              className={`relative h-32 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2
                ${especie === "perro" ? "border-[#2F8F83] bg-[#E6F4F2]" : "border-gray-200 hover:border-[#2F8F83]"}`}
            >
              <svg className="w-12 h-12 text-[#2F8F83]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 4c-.8 0-1.5.4-2 1-.5-.6-1.2-1-2-1s-1.5.4-2 1c-.5-.6-1.2-1-2-1-1.7 0-3 1.3-3 3v1c0 2.2 1.8 4 4 4h2c2.2 0 4-1.8 4-4V7c0-1.7-1.3-3-3-3zm-8 9c-3.3 0-6 2.7-6 6v1h20v-1c0-3.3-2.7-6-6-6h-8z"/>
              </svg>
              <span className="font-medium text-gray-700">Perro</span>
              {especie === "perro" && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-[#2F8F83] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>

            {/* GATO */}
            <button
              type="button"
              onClick={() => handleEspecieSelect("gato")}
              className={`relative h-32 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2
                ${especie === "gato" ? "border-[#2F8F83] bg-[#E6F4F2]" : "border-gray-200 hover:border-[#2F8F83]"}`}
            >
              <svg className="w-12 h-12 text-[#2F8F83]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C9.24 2 7 4.24 7 7v1c-1.66 0-3 1.34-3 3v2h16v-2c0-1.66-1.34-3-3-3V7c0-2.76-2.24-5-5-5zm-1 7h2v2h-2V9zm-6 6v5c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-5H5z"/>
              </svg>
              <span className="font-medium text-gray-700">Gato</span>
              {especie === "gato" && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-[#2F8F83] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Nombre de la Mascota */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de la mascota*
          </label>
          <input
            type="text"
            value={nombreMascota}
            onChange={(e) => setNombreMascota(e.target.value)}
            placeholder="Ej: Firulais"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none"
          />
        </div>

        {/* Raza */}
        {especie && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Raza*
            </label>
            {viewModel.isLoadingRazas ? (
              <div className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-400">
                Cargando razas...
              </div>
            ) : (
              <select
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none"
              >
                <option value="">Selecciona una raza</option>
                {viewModel.razas.map((r) => (
                  <option key={r.id_raza} value={r.nombre}>
                    {r.nombre}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          disabled={!isValid}
          onClick={handleContinue}
          className={`h-12 px-10 rounded-xl font-medium text-sm transition-colors
            ${isValid ? "bg-[#2F8F83] text-white hover:bg-[#267A6F]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
        >
          Continuar →
        </button>
      </div>
    </div>
  );
}