"use client";

import React, { useState } from "react";
import { usePacientesViewModel } from "@/modules/mascotas-admin/viewmodel/usePacientesViewModel";
import { PacienteUI } from "../model/ui.model";
import PacientesHeader, { FiltroEspecie } from "./PacientesHeader";
import PacientesTable from "./PacientesTable";
import PacienteHistorialModal from "./PacienteHistorialModal";

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ width: "36px", height: "36px", border: "4px solid #E5E7EB", borderTop: "4px solid #4F8A7C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function PacientesPage() {
  const { filteredPacientes, searchTerm, setSearchTerm, loading } = usePacientesViewModel();
  const [selectedPaciente, setSelectedPaciente] = useState<PacienteUI | null>(null);
  const [filtroEspecie, setFiltroEspecie] = useState<FiltroEspecie>("todos");

  if (loading) return <Spinner />;

  const pacientesFiltrados = filtroEspecie === "todos"
    ? filteredPacientes
    : filteredPacientes.filter((p) =>
        filtroEspecie === "perro" ? p.especieIcon !== "cat" : p.especieIcon === "cat"
      );

  return (
    <div style={{ padding: "32px", minHeight: "100vh" }}>
      <PacientesHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filtroEspecie={filtroEspecie}
        onFiltroChange={setFiltroEspecie}
      />
      <PacientesTable pacientes={pacientesFiltrados} onVerPaciente={setSelectedPaciente} />
      {selectedPaciente && (
        <PacienteHistorialModal
          paciente={selectedPaciente}
          onClose={() => setSelectedPaciente(null)}
        />
      )}
    </div>
  );
}
