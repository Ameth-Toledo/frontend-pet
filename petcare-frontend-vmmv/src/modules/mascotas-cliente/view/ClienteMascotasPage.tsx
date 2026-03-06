"use client";

import React, { useState } from "react";
import { useClienteMascotasViewModel } from "@/modules/mascotas-cliente/viewmodel/useClienteMascotasViewModel";
import MascotasHeader from "./MascotasHeader";
import MascotaCard from "./MascotaCard";

function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-emerald-600 rounded-full animate-spin" />
    </div>
  );
}

export function ClienteMascotasPage() {
  const { mascotas, loading } = useClienteMascotasViewModel();

  const [selectedMascota, setSelectedMascota] = useState<any>(null);
  const [mode, setMode] = useState<"view" | "edit" | null>(null);

  if (loading) return <Spinner />;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <MascotasHeader />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
        {mascotas.map((mascota) => (
          <MascotaCard
            key={mascota.id}
            mascota={mascota}
            onVer={() => {
              setSelectedMascota(mascota);
              setMode("view");
            }}
            onEditar={() => {
              setSelectedMascota(mascota);
              setMode("edit");
            }}
          />
        ))}
      </div>

      {/* MODAL */}
      {selectedMascota && mode && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[520px] rounded-2xl shadow-xl p-8 relative">

            <button
              onClick={() => {
                setSelectedMascota(null);
                setMode(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>

            {mode === "view" && (
              <>
                <h2 className="text-lg font-bold mb-4">
                  Perfil de mascota
                </h2>

                <div className="space-y-3 text-sm">
                  <p><strong>Nombre:</strong> {selectedMascota.nombre}</p>
                  <p><strong>Especie:</strong> {selectedMascota.especie}</p>
                  <p><strong>Raza:</strong> {selectedMascota.raza}</p>
                  <p><strong>Edad:</strong> {selectedMascota.edad}</p>
                </div>
              </>
            )}

            {mode === "edit" && (
              <>
                <h2 className="text-lg font-bold mb-4">
                  Editar mascota
                </h2>

                <div className="space-y-4">
                  <input
                    defaultValue={selectedMascota.nombre}
                    className="w-full border rounded-lg p-2 text-sm"
                  />
                  <input
                    defaultValue={selectedMascota.raza}
                    className="w-full border rounded-lg p-2 text-sm"
                  />
                  <input
                    defaultValue={selectedMascota.edad}
                    className="w-full border rounded-lg p-2 text-sm"
                  />

                  <button className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-semibold">
                    Guardar cambios
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}