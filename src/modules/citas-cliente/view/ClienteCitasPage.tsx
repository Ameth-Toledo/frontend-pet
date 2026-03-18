"use client";

import React from "react";
import { useClienteCitasViewModel } from "@/modules/citas-cliente/viewmodel/useClienteCitasViewModel";
import CitasHeader from "./CitasHeader";
import CitaCard from "./CitaCard";
import CitaDetalleModal from "./CitaDetalleModal";

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <div style={{ width: "40px", height: "40px", border: "4px solid #E5E7EB", borderTop: "4px solid #4F8A7C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function ClienteCitasPage() {
  const { citas, isLoading, error, selectedCita, setSelectedCita } = useClienteCitasViewModel();

  if (isLoading) return <Spinner />;

  if (error) return (
    <div style={{ padding: "32px" }}>
      <p style={{ color: "#EF4444", fontSize: "14px" }}>Error: {error}</p>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#F7F9FB", minHeight: "100vh", padding: "32px" }}>
      <CitasHeader />

      {citas.length === 0 ? (
        <div style={{ maxWidth: "640px", textAlign: "center", padding: "60px 0", color: "#9CA3AF", fontSize: "14px" }}>
          No tienes citas registradas aún.
        </div>
      ) : (
        <div style={{ maxWidth: "640px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {citas.map((cita) => (
            <CitaCard key={cita.id} cita={cita} onClick={() => setSelectedCita(cita)} />
          ))}
        </div>
      )}

      {selectedCita && (
        <CitaDetalleModal cita={selectedCita} onClose={() => setSelectedCita(null)} />
      )}
    </div>
  );
}