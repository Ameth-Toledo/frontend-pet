"use client";

import React from "react";
import { useClienteMascotasViewModel } from "@/modules/mascotas-cliente/viewmodel/useClienteMascotasViewModel";
import MascotasHeader from "./MascotasHeader";
import MascotaCard from "./MascotaCard";
import AddMascotaCard from "./AddMascotaCard";
import MascotaDetalleModal from "./MascotaDetalleModal";
import MascotaEditModal from "./MascotaEditModal";

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <div style={{ width: "40px", height: "40px", border: "4px solid #E5E7EB", borderTop: "4px solid #4F8A7C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function ClienteMascotasPage() {
  const { mascotas, loading, error, selectedMascota, setSelectedMascota, mode, setMode, handleAgregarMascota } =
    useClienteMascotasViewModel();

  if (loading) return <Spinner />;

  if (error) return (
    <div style={{ padding: "32px" }}>
      <p style={{ color: "#EF4444", fontSize: "14px" }}>Error: {error}</p>
    </div>
  );

  return (
    <div style={{ padding: "32px", backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      <MascotasHeader />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "24px" }}>
        {mascotas.map((mascota) => (
          <MascotaCard
            key={mascota.id}
            mascota={mascota}
            onVer={(id) => {
              const found = mascotas.find((m) => m.id === id) ?? null;
              setSelectedMascota(found);
              setMode("view");
            }}
            onEditar={(id) => {
              const found = mascotas.find((m) => m.id === id) ?? null;
              setSelectedMascota(found);
              setMode("edit");
            }}
          />
        ))}
        <AddMascotaCard onClick={handleAgregarMascota} />
      </div>

      {selectedMascota && mode === "view" && (
        <MascotaDetalleModal mascota={selectedMascota} onClose={() => { setSelectedMascota(null); setMode(null); }} />
      )}

      {selectedMascota && mode === "edit" && (
        <MascotaEditModal mascota={selectedMascota} onClose={() => { setSelectedMascota(null); setMode(null); }} />
      )}
    </div>
  );
}