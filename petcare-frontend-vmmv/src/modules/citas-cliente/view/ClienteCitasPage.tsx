"use client";

import React, { useState } from "react";
import { useClienteCitasViewModel } from "@/modules/citas-cliente/viewmodel/useClienteCitasViewModel";
import CitasHeader from "./CitasHeader";
import CitaCard from "./CitaCard";

const C = {
  green: "#4F8A7C",
  bg: "#F7F9FB",
};

function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-[#4F8A7C] rounded-full animate-spin" />
    </div>
  );
}

export function ClienteCitasPage() {
  const { citas, isLoading } = useClienteCitasViewModel();
  const [selectedCita, setSelectedCita] = useState<any>(null);

  if (isLoading) return <Spinner />;

  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh" }}>
      <div className="p-8">

        <CitasHeader />

        <div className="max-w-[640px] flex flex-col gap-4">
          {citas.map((cita) => (
            <div
              key={cita.id}
              onClick={() => setSelectedCita(cita)}
              className="cursor-pointer hover:shadow-lg transition rounded-xl"
            >
              <CitaCard cita={cita} />
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedCita && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[500px] rounded-2xl shadow-xl p-8 relative">

            <button
              onClick={() => setSelectedCita(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-4">
              Detalle de la cita
            </h2>

            <div className="space-y-3 text-sm">
              <p><strong>Mascota:</strong> {selectedCita.mascota}</p>
              <p><strong>Servicio:</strong> {selectedCita.servicio}</p>
              <p><strong>Fecha:</strong> {selectedCita.fecha}</p>
              <p><strong>Hora:</strong> {selectedCita.hora}</p>

              <div className="mt-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${selectedCita.estado === "CONFIRMADA" ? "bg-green-100 text-green-700" : ""}
                  ${selectedCita.estado === "CANCELADA" ? "bg-red-100 text-red-700" : ""}
                  ${selectedCita.estado === "COMPLETADA" ? "bg-gray-200 text-gray-700" : ""}
                `}>
                  {selectedCita.estado}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}