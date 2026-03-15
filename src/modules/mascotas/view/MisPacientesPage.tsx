"use client";

import React from "react";
import { useMascotasViewModel } from "../viewmodel/useMascotasViewModel";
import MascotasList from "./MascotasList";
import MascotasToolbar from "./MascotasToolbar";

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ width: "36px", height: "36px", border: "4px solid #E5E7EB", borderTop: "4px solid #4F8A7C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function MisPacientesPage() {
  const { mascotas, filtradas, busqueda, setBusqueda, loading, error, userName } = useMascotasViewModel();

  if (loading) return <Spinner />;

  if (error) return (
    <div style={{ padding: "32px" }}>
      <p style={{ color: "#EF4444", fontSize: "14px" }}>Error: {error}</p>
    </div>
  );

  return (
    <div style={{ padding: "32px", backgroundColor: "#F7F9FB", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#1F2937", margin: 0 }}>Mis pacientes</h1>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0 0" }}>Gestión integral de la base de datos clínica.</p>
        </div>
        <MascotasToolbar busqueda={busqueda} onBusqueda={setBusqueda} userName={userName} />
      </div>

      <MascotasList mascotas={filtradas} total={mascotas.length} />
    </div>
  );
}
