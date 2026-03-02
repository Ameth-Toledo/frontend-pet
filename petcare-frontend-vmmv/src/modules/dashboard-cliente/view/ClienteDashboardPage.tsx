"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useClienteDashboardViewModel } from "@/modules/dashboard-cliente/viewmodel/useClienteDashboardViewModel";
import DashboardHeader from "./DashboardHeader";
import PetCard from "./PetCard";

const C = {
  green: "#5BAA9C",
  white: "#FFFFFF",
  bg: "#F7F9F8",
  textMain: "#1F2937",
  textSub: "#6B7280",
  border: "#E5E7EB",
};

function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-[#5BAA9C] rounded-full animate-spin" />
    </div>
  );
}

export default function ClienteDashboardPage() {
  const { data, loading, error } = useClienteDashboardViewModel();
  const router = useRouter();
  const [showCartilla, setShowCartilla] = useState(false);

  if (loading) return <Spinner />;

  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh" }}>
      <div className="p-8">

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700 mb-6">
            {error}
          </div>
        )}

        {data && (
          <>
            {/* Botones de acción */}
            <div className="flex gap-4 mb-8 flex-wrap">
              <button
                onClick={() => router.push("/agendar-cita")}
                className="px-6 py-3 rounded-xl text-white font-semibold"
                style={{ backgroundColor: C.green }}
              >
                Agendar cita
              </button>

              <button
                onClick={() => router.push("/agendar-cita/mascota")}
                className="px-6 py-3 rounded-xl border font-semibold"
                style={{ borderColor: C.green, color: C.green }}
              >
                Agregar mascota
              </button>

              <button
                onClick={() => setShowCartilla(true)}
                className="px-6 py-3 rounded-xl border font-semibold text-gray-600 border-gray-300"
              >
                Ver cartilla de vacunación
              </button>
            </div>

            {/* Mis Mascotas */}
            <h2 className="text-xl font-bold mb-6" style={{ color: C.textMain }}>
              Mis Mascotas
            </h2>

            <div className="flex gap-6 flex-wrap">
              {data.mascotas.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* MODAL CARTILLA MOCK */}
      {showCartilla && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[900px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-8 relative">
            <button
              onClick={() => setShowCartilla(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-6">
              Cartilla de vacunación
            </h2>

            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Vacuna</th>
                  <th className="p-3 text-left">Fecha aplicación</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3">Antirrábica</td>
                  <td className="p-3">15 Ene 2024</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Séxtuple Canina</td>
                  <td className="p-3">12 Dic 2023</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Bordetella</td>
                  <td className="p-3">10 Oct 2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}