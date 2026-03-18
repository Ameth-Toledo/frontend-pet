"use client";

import React, { useState } from "react";
import { useCitasViewModel } from "@/modules/citas-admin/viewmodel/useCitasViewModel";
import CitasHeader, { FiltroServicio } from "./CitasHeader";
import CitasTable from "./CitasTable";
import CitaDetailModal from "./CitaDetailModal";
import { CitaDetailData } from "../model/dto/props/CitaDetailModalProps";
import { CitaUI } from "../model/ui.model";

const especieMap: Record<string, string> = { dog: "Perro", cat: "Gato", bird: "Ave", other: "Otro" };

function mapCitaToDetail(cita: CitaUI): CitaDetailData {
  return {
    nombre:      cita.paciente,
    raza:        cita.raza,
    especie:     cita.raza,
    propietario: cita.propietario,
    servicio:    cita.servicio,
    hora:        cita.hora,
    fecha:       cita.fecha,
    profesional: cita.veterinario ?? 'Sin asignar',
  };
}

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ width: "36px", height: "36px", border: "4px solid #E5E7EB", borderTop: "4px solid #4F8A7C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function CitasPage() {
  const { filteredCitas, searchTerm, setSearchTerm, loading } = useCitasViewModel();
  const [selectedCita,   setSelectedCita]   = useState<CitaUI | null>(null);
  const [filtroServicio, setFiltroServicio] = useState<FiltroServicio>("todos");

  if (loading) return <Spinner />;

  const citasFiltradas = filtroServicio === "todos"
    ? filteredCitas
    : filteredCitas.filter((c) => c.servicio === "Chequeo médico");

  return (
    <div style={{ padding: "32px", minHeight: "100vh" }}>
      <CitasHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filtroServicio={filtroServicio}
        onFiltroChange={setFiltroServicio}
      />
      <CitasTable citas={citasFiltradas} onVerCita={setSelectedCita} />

      {selectedCita && (
        <CitaDetailModal
          data={mapCitaToDetail(selectedCita)}
          onClose={() => setSelectedCita(null)}
        />
      )}
    </div>
  );
}