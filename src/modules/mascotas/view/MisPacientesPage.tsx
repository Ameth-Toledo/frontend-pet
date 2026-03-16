"use client";

import React, { useState } from "react";
import { useMascotasViewModel } from "../viewmodel/useMascotasViewModel";
import MascotasList from "./MascotasList";
import MascotaForm, { FiltroEspecieMascota } from "./MascotaForm";
import MascotaHistorialModal from "./MascotaHistorialModal";
import { MascotaUI } from "../model/ui.model";

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div
        style={{
          width: "36px",
          height: "36px",
          border: "4px solid #E5E7EB",
          borderTop: "4px solid #4F8A7C",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function MisPacientesPage() {
  const { mascotas, filtradas, busqueda, setBusqueda, loading } = useMascotasViewModel();
  const [filtroEspecie, setFiltroEspecie] = useState<FiltroEspecieMascota>("todos");
  const [selectedMascota, setSelectedMascota] = useState<MascotaUI | null>(null);

  const mascotasFiltradas = filtroEspecie === "todos"
    ? filtradas
    : filtradas.filter((m) =>
        filtroEspecie === "gato"
          ? m.especie.toLowerCase() === "gato"
          : m.especie.toLowerCase() !== "gato"
      );

  if (loading) return <Spinner />;

  return (
    <div style={{ padding: "32px", backgroundColor: "#F7F9FB", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#1F2937", margin: 0 }}>
            Mis pacientes
          </h1>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0 0" }}>
            Gestión integral de la base de datos clínica.
          </p>
        </div>
        <MascotaForm
          busqueda={busqueda}
          onBusqueda={setBusqueda}
          filtroEspecie={filtroEspecie}
          onFiltroChange={setFiltroEspecie}
        />
      </div>

      {/* Tabla */}
      <MascotasList mascotas={mascotasFiltradas} total={mascotas.length} onVerMascota={setSelectedMascota} />

      {selectedMascota && (
        <MascotaHistorialModal mascota={selectedMascota} onClose={() => setSelectedMascota(null)} />
      )}
    </div>
  );
}
