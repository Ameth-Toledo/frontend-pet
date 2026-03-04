"use client";

import { useAgendarCita } from "../context";
import { useResumenViewModel } from "@/modules/citas/viewmodel/ResumenViewModel";

export default function ResumenPage() {
  const {
    selectedService,
    email,
    nombre,
    apellido,
    telefono,
    especie,
    nombreMascota,
    raza,
    selectedVeterinario,
    selectedFecha,
    selectedHorario,
    motivo
  } = useAgendarCita();

  const viewModel = useResumenViewModel();

  const handleConfirm = () => {
    const appointmentData = {
      servicio: selectedService,
      veterinario: selectedVeterinario,
      fecha: selectedFecha || "",
      horario: selectedHorario || "",
      motivo: motivo || "",
      userData: { email: email || "", nombre: nombre || "", apellido: apellido || "", telefono: telefono || "" },
      mascotaData: { especie: especie || "", nombreMascota: nombreMascota || "", raza: raza || "" }
    };

    viewModel.confirmarCita(appointmentData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">NUEVA CITA</p>
        <h1 className="text-3xl font-bold text-gray-900">Resumen de tu cita</h1>
      </div>

      {viewModel.error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
          {viewModel.error}
        </div>
      )}

      <div className="space-y-6">
        {/* Servicio */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E6F4F2] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#2F8F83]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Servicio</h3>
                <p className="text-gray-700">{selectedService?.nombre}</p>
                {motivo && <p className="text-sm text-gray-500 mt-1">{motivo}</p>}
              </div>
            </div>
            <button
              onClick={() => viewModel.modificarPaso('servicio')}
              className="text-sm text-[#2F8F83] hover:underline font-medium"
            >
              Modificar
            </button>
          </div>
        </div>

        {/* Propietario */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E6F4F2] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#2F8F83]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Propietario</h3>
                <p className="text-gray-700">{nombre} {apellido}</p>
                <p className="text-sm text-gray-500">{email}</p>
                <p className="text-sm text-gray-500">{telefono}</p>
              </div>
            </div>
            <button
              onClick={() => viewModel.modificarPaso('datos')}
              className="text-sm text-[#2F8F83] hover:underline font-medium"
            >
              Modificar
            </button>
          </div>
        </div>

        {/* Mascota */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E6F4F2] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#2F8F83]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 4c-.8 0-1.5.4-2 1-.5-.6-1.2-1-2-1s-1.5.4-2 1c-.5-.6-1.2-1-2-1-1.7 0-3 1.3-3 3v1c0 2.2 1.8 4 4 4h2c2.2 0 4-1.8 4-4V7c0-1.7-1.3-3-3-3zm-8 9c-3.3 0-6 2.7-6 6v1h20v-1c0-3.3-2.7-6-6-6h-8z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Mascota</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Especie</p>
                    <p className="text-gray-700 capitalize">{especie}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Raza</p>
                    <p className="text-gray-700">{raza}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Nombre</p>
                    <p className="text-gray-700">{nombreMascota}</p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => viewModel.modificarPaso('mascota')}
              className="text-sm text-[#2F8F83] hover:underline font-medium"
            >
              Modificar
            </button>
          </div>
        </div>

        {/* Profesional */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E6F4F2] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#2F8F83]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Profesional</h3>
                <p className="text-gray-700">{selectedVeterinario?.nombre} {selectedVeterinario?.apellido}</p>
                <p className="text-sm text-gray-500">{selectedVeterinario?.especialidad}</p>
              </div>
            </div>
            <button
              onClick={() => viewModel.modificarPaso('fecha')}
              className="text-sm text-[#2F8F83] hover:underline font-medium"
            >
              Modificar
            </button>
          </div>
        </div>

        {/* Fecha y Hora */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E6F4F2] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#2F8F83]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Fecha y Hora</h3>
                <p className="text-gray-700 text-lg font-medium">
                  {selectedFecha && viewModel.formatFecha(selectedFecha)} - {selectedHorario && viewModel.formatHorario(selectedHorario)}
                </p>
              </div>
            </div>
            <button
              onClick={() => viewModel.modificarPaso('horario')}
              className="text-sm text-[#2F8F83] hover:underline font-medium"
            >
              Modificar
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={handleConfirm}
          disabled={viewModel.isLoading}
          className={`w-full h-14 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2
            ${viewModel.isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#2F8F83] hover:bg-[#267A6F] text-white"}`}
        >
          {viewModel.isLoading ? "Procesando..." : "Confirmar Cita"}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}