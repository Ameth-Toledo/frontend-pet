"use client";

import { useState } from "react";
import { useAgendarCita } from "../context";
import { useHorarioViewModel } from "@/modules/citas/viewmodel/HorarioViewModel";

export default function HorarioPage() {
  const {
    selectedFecha,
    selectedHorario,
    setSelectedHorario,
  } = useAgendarCita();

  const viewModel = useHorarioViewModel(selectedFecha || "");

  const [horario, setHorario] = useState(selectedHorario || "");

  const handleHorarioSelect = (slot: string) => {
    setHorario(slot);
  };

  const handleContinue = () => {
    const saveToContext = (h: string) => {
      setSelectedHorario(h);
    };

    viewModel.continuar(horario, saveToContext);
  };

  const isValid = viewModel.validateForm(horario);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">NUEVA CITA</p>
        <h1 className="text-3xl font-bold text-gray-900">Selecciona horario</h1>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Horarios disponibles*
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {viewModel.generateTimeSlots().map((slot) => {
            const isSelected = horario === slot;
            
            return (
              <button
                key={slot}
                onClick={() => handleHorarioSelect(slot)}
                className={`py-3 px-4 rounded-xl border-2 font-medium transition-all
                  ${isSelected 
                    ? "border-[#2F8F83] bg-[#2F8F83] text-white" 
                    : "border-gray-200 hover:border-[#2F8F83] text-gray-700"
                  }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 flex justify-center gap-4">
        <button
          onClick={viewModel.volver}
          className="h-12 px-8 rounded-xl font-medium text-sm border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          ← Volver
        </button>
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