"use client";

import React, { useState } from "react";
import { useMascotasViewModel } from "../viewmodel/useMascotasViewModel";
import MascotasList from "./MascotasList";
import MascotaForm, { FiltroEspecieMascota } from "./MascotaForm";
import MascotaHistorialModal from "./MascotaHistorialModal";
import NuevoPacienteModal from "./NuevoPacienteModal";
import EditarPacienteModal from "./EditarPacienteModal";
import { MascotaUI } from "../model/ui.model";

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ width: "36px", height: "36px", border: "4px solid #E5E7EB", borderTop: "4px solid #4F8A7C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function MisPacientesPage() {
  const { mascotas, filtradas, busqueda, setBusqueda, loading } = useMascotasViewModel();
  const [filtroEspecie,   setFiltroEspecie]   = useState<FiltroEspecieMascota>("todos");
  const [selectedMascota, setSelectedMascota] = useState<MascotaUI | null>(null);
  const [editMascota,     setEditMascota]     = useState<MascotaUI | null>(null);
  const [showNuevo,       setShowNuevo]       = useState(false);

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#1F2937", margin: 0 }}>Mis pacientes</h1>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0 0" }}>Gestión integral de la base de datos clínica.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <MascotaForm busqueda={busqueda} onBusqueda={setBusqueda} filtroEspecie={filtroEspecie} onFiltroChange={setFiltroEspecie} />
          <button
            onClick={() => setShowNuevo(true)}
            style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#4F8A7C", border: "none", borderRadius: "10px", padding: "9px 18px", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#3E6F63"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4F8A7C"; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nuevo paciente
          </button>
        </div>
      </div>

      <MascotasList
        mascotas={mascotasFiltradas}
        total={mascotas.length}
        onVerMascota={(m) => setSelectedMascota(m)}
        onEditarMascota={(m) => setEditMascota(m)}
      />

      {selectedMascota && (
        <MascotaHistorialModal mascota={selectedMascota} onClose={() => setSelectedMascota(null)} />
      )}
      {editMascota && (
        <EditarPacienteModal mascota={editMascota} onClose={() => setEditMascota(null)} onGuardar={() => setEditMascota(null)} />
      )}
      {showNuevo && (
        <NuevoPacienteModal onClose={() => setShowNuevo(false)} onGuardar={() => setShowNuevo(false)} />
      )}
    </div>
  );
}