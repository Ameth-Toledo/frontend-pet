"use client";

import React, { useState } from "react";
import { usePersonalViewModel } from "@/modules/personal/viewmodel/usePersonalViewModel";
import { VeterinarioUI } from "../model/ui.model";
import PersonalHeader, { FiltroRol } from "./PersonalHeader";
import PersonalTable from "./PersonalTable";
import PersonalFormModal from "./PersonalFormModal";
import VeterinarioEditModal from "./VeterinarioEditModal";

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ width: "36px", height: "36px", border: "4px solid #E5E7EB", borderTop: "4px solid #4F8A7C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function PersonalPage() {
  const { filteredVeterinarios, searchTerm, setSearchTerm, loading, isCreateOpen, openCreate, closeCreate } =
    usePersonalViewModel();
  const [selectedVet, setSelectedVet] = useState<VeterinarioUI | null>(null);
  const [filtroRol, setFiltroRol] = useState<FiltroRol>("todos");

  if (loading) return <Spinner />;

  const personalFiltrado = filtroRol === 'todos'
    ? filteredVeterinarios
    : filteredVeterinarios.filter((v) =>
        filtroRol === 'administradores'
          ? v.rol === 'ADMINISTRADOR'
          : v.rol === 'VETERINARIO'
      );

  return (
    <div style={{ padding: "32px", minHeight: "100vh" }}>
      <PersonalHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onNuevoClick={openCreate}
        filtroRol={filtroRol}
        onFiltroChange={setFiltroRol}
      />
      <PersonalTable veterinarios={personalFiltrado} onEditarVeterinario={setSelectedVet} />
      {isCreateOpen && <PersonalFormModal onClose={closeCreate} />}
      {selectedVet && (
        <VeterinarioEditModal
          veterinario={selectedVet}
          onClose={() => setSelectedVet(null)}
        />
      )}
    </div>
  );
}
