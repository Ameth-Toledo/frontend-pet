"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useClienteMascotasViewModel } from "@/modules/mascotas-cliente/viewmodel/useClienteMascotasViewModel";
import MascotasHeader from "./MascotasHeader";
import MascotaCard from "./MascotaCard";
import AddMascotaCard from "./AddMascotaCard";
import { MascotaUI } from "../model/ui.model";
import AgregarMascotaModal from "@/modules/dashboard-cliente/view/AgregarMascotaModal";

function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-emerald-600 rounded-full animate-spin" />
    </div>
  );
}

export function ClienteMascotasPage() {
  const router = useRouter();
  const { mascotas, loading } = useClienteMascotasViewModel();

  const [selectedMascota, setSelectedMascota] = useState<MascotaUI | null>(null);
  const [mode,            setMode]            = useState<"edit" | null>(null);
  const [showAgregar,     setShowAgregar]      = useState(false);

  if (loading) return <Spinner />;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <MascotasHeader />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
        {mascotas.map((mascota) => (
          <MascotaCard
            key={mascota.id}
            mascota={mascota}
            onVer={(id) => router.push(`/cliente/mismascotas/${id}`)}
            onEditar={() => { setSelectedMascota(mascota); setMode("edit"); }}
          />
        ))}
        <AddMascotaCard onClick={() => setShowAgregar(true)} />
      </div>

      {selectedMascota && mode === "edit" && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[520px] rounded-2xl shadow-xl p-8 relative">
            <button onClick={() => { setSelectedMascota(null); setMode(null); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">✕</button>

            <h2 className="text-lg font-bold mb-6">Editar mascota</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input defaultValue={selectedMascota.nombre}
                  className="w-full border rounded-lg p-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especie</label>
                <input defaultValue={selectedMascota.especie}
                  className="w-full border rounded-lg p-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
                <input defaultValue={selectedMascota.edad}
                  className="w-full border rounded-lg p-2 text-sm" />
              </div>
              <button
                onClick={() => { setSelectedMascota(null); setMode(null); }}
                className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-semibold">
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {showAgregar && (
        <AgregarMascotaModal
          onClose={() => setShowAgregar(false)}
          onGuardar={(nombre, especie, raza) => {
            setShowAgregar(false);
          }}
        />
      )}
    </div>
  );
}