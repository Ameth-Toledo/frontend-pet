"use client";

import { useState, useEffect } from "react";
import { useAgendarCita } from "../context";
import { useFechaViewModel } from "@/modules/citas/viewmodel/FechaViewModel";

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function FechaPage() {
  const {
    nombreMascota,
    selectedVeterinario,
    setSelectedVeterinario,
    selectedFecha,
    setSelectedFecha,
  } = useAgendarCita();

  const viewModel = useFechaViewModel(nombreMascota || "");

  const [veterinarioId, setVeterinarioId] = useState<number | null>(
    selectedVeterinario?.id_personal || null
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    console.log('useEffect triggered - veterinarioId:', veterinarioId);
    if (veterinarioId && !isNaN(veterinarioId)) {
      console.log('Llamando loadDiasDisponibles...');
      viewModel.loadDiasDisponibles(veterinarioId);
    }
  }, [veterinarioId]);

  useEffect(() => {
    if (veterinarioId && !isNaN(veterinarioId)) {
      console.log('Mes cambió, recargando días...');
      viewModel.loadDiasDisponibles(veterinarioId);
    }
  }, [viewModel.currentMonth]);

  const handleVeterinarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log('Value del select:', value, 'tipo:', typeof value);
    
    if (!value || value === "") {
      setVeterinarioId(null);
      setSelectedDay(null);
      setSelectedFecha("");
      return;
    }

    const id = parseInt(value, 10);
    console.log('Veterinario seleccionado (parseado):', id);
    
    if (isNaN(id)) {
      console.error('ID inválido:', value);
      return;
    }

    setVeterinarioId(id);
    setSelectedDay(null);
    setSelectedFecha("");
  };

  const handleDayClick = (day: number) => {
    if (!veterinarioId) return;
    if (viewModel.isPastDate(day)) return;
    if (!viewModel.isDayAvailable(day)) return;

    setSelectedDay(day);
    const fecha = `${viewModel.currentMonth.getFullYear()}-${String(viewModel.currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedFecha(fecha);
  };

  const handleContinue = () => {
    if (!selectedFecha) return;

    const saveToContext = (vet: any, fecha: string) => {
      setSelectedVeterinario({
        id_personal: vet.id_personal,
        nombre: vet.nombre,
        apellido: vet.apellido,
        especialidad: vet.especialidad || "Veterinario"
      });
      setSelectedFecha(fecha);
    };

    viewModel.continuar(veterinarioId, selectedFecha, saveToContext);
  };

  const isValid = viewModel.validateForm(veterinarioId, selectedFecha || "");

  if (viewModel.isLoadingVeterinarios) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F8F83] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando veterinarios...</p>
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
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">NUEVA CITA</p>
        <h1 className="text-3xl font-bold text-gray-900">Selecciona fecha</h1>
      </div>

      <div className="space-y-6">
        {/* Selector de Veterinario */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Veterinario*
          </label>
          <select
            value={veterinarioId || ""}
            onChange={handleVeterinarioChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none"
          >
            <option value="">Selecciona un veterinario</option>
            {viewModel.veterinarios.map((vet, index) => {
              // El backend devuelve 'id' en lugar de 'id_personal'
              const vetId = (vet as any).id || (vet as any).id_personal;
              console.log('Vet:', vet.nombre, 'ID:', vetId);
              
              return (
                <option key={`vet-${vetId}-${index}`} value={vetId}>
                  {vet.nombre} {vet.apellido} {vet.especialidad ? `- ${vet.especialidad}` : ''}
                </option>
              );
            })}
          </select>
        </div>

        {/* Calendario */}
        {veterinarioId && !isNaN(veterinarioId) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Fecha*
            </label>

            {viewModel.isLoadingDias && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2F8F83] mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Cargando disponibilidad...</p>
              </div>
            )}

            {!viewModel.isLoadingDias && (
              <div className="border border-gray-200 rounded-2xl p-6">
                {/* Header del calendario */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={viewModel.goToPreviousMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h3 className="font-semibold text-gray-900">
                    {MONTH_NAMES[viewModel.currentMonth.getMonth()]} {viewModel.currentMonth.getFullYear()}
                  </h3>
                  <button
                    onClick={viewModel.goToNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Días de la semana */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {DAY_NAMES.map((day, idx) => (
                    <div key={`day-${idx}`} className="text-center text-sm font-medium text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Días del mes */}
                <div className="grid grid-cols-7 gap-2">
                  {viewModel.getDaysInMonth(viewModel.currentMonth).map((day, index) => {
                    if (day === null) {
                      return <div key={`empty-${index}`} />;
                    }

                    const isPast = viewModel.isPastDate(day);
                    const isAvailable = viewModel.isDayAvailable(day);
                    const isSelected = selectedDay === day;
                    const isDisabled = isPast || !isAvailable;

                    return (
                      <button
                        key={`cell-${index}`}
                        onClick={() => handleDayClick(day)}
                        disabled={isDisabled}
                        className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all
                          ${isDisabled ? "text-gray-300 cursor-not-allowed bg-gray-50" : "hover:bg-[#E6F4F2]"}
                          ${isSelected ? "bg-[#2F8F83] text-white hover:bg-[#267A6F]" : "text-gray-700"}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {viewModel.diasDisponibles.size === 0 && !viewModel.isLoadingDias && (
                  <div className="mt-4 text-center text-sm text-gray-500">
                    Este veterinario no tiene horarios disponibles este mes
                  </div>
                )}
              </div>
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
