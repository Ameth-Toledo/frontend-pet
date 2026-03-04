"use client";

import { useState } from "react";
import { useAgendarCita } from "../context";
import { useServicioViewModel } from "@/modules/citas/viewmodel/ServicioViewModel";

const MOTIVOS_CHEQUEO = [
  "Vómito",
  "Diarrea",
  "Diarrea con sangre",
  "Se comió algo indebido",
  "Vacunación",
  "Seguimiento rutinario",
  "Desparasitación",
];

export default function ServicioPage() {
  const { selectedService, setSelectedService, setMotivo } = useAgendarCita();
  const viewModel = useServicioViewModel();
  
  const [motivoSelected, setMotivoSelected] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleServiceSelect = (servicio: any) => {
    setSelectedService(servicio);
    setMotivoSelected("");
    setDescripcion("");
  };

  const handleContinue = () => {
    viewModel.continuar(selectedService, motivoSelected, descripcion, setMotivo);
  };

  const isValid = viewModel.validateForm(selectedService, motivoSelected, descripcion);

  if (viewModel.isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F8F83] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando servicios...</p>
        </div>
      </div>
    );
  }

  if (viewModel.error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {viewModel.error}
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-[#1E293B] text-center mb-2">
        Escoge un servicio
      </h1>
      <p className="text-sm text-[#64748B] text-center mb-10">
        Selecciona el tipo de atención que necesita tu mascota hoy.
      </p>

      <div className="space-y-6">
        {viewModel.servicios.map((servicio) => {
          const isSelected = selectedService?.id_servicio === servicio.id_servicio;
          const isChequeo = viewModel.isChequeoMedico(servicio);

          return (
            <div
              key={servicio.id_servicio}
              onClick={() => handleServiceSelect(servicio)}
              className={`border rounded-2xl p-6 cursor-pointer transition-all
                ${isSelected ? "border-[#2F8F83] bg-[#E6F4F2]" : "border-gray-200 hover:border-[#2F8F83]"}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{servicio.nombre}</h3>
                  <p className="text-sm text-gray-600">{servicio.descripcion}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${isSelected ? "border-[#2F8F83] bg-[#2F8F83]" : "border-gray-300"}`}>
                  {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </div>

              {isSelected && isChequeo && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Motivo de la consulta
                    </label>
                    <select
                      value={motivoSelected}
                      onChange={(e) => setMotivoSelected(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none"
                    >
                      <option value="">Selecciona un motivo</option>
                      {MOTIVOS_CHEQUEO.map((motivo) => (
                        <option key={motivo} value={motivo}>
                          {motivo}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      placeholder="Cuéntanos un poco más sobre lo que necesita tu mascota..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {isSelected && !isChequeo && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detalles adicionales (opcional)
                  </label>
                  <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Agrega cualquier detalle que consideres importante..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none resize-none"
                    rows={3}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {viewModel.servicios.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No hay servicios disponibles en este momento.
        </div>
      )}

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
    </>
  );
}