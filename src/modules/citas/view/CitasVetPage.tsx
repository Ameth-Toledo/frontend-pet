"use client";

import React, { useState } from "react";
import { useCitasVetViewModel } from "@/modules/citas/viewmodel/useCitasViewModel";
import { CitaVetUI } from "../model/ui.model";
import CitasVetHeader, { FiltroServicioVet } from "./CitasVetHeader";
import CitasVetTable from "./CitasVetTable";
import ConsultaNotasModal from "./ConsultaNotasModal";
import CitaDetailModal from "@/modules/citas-admin/view/CitaDetailModal";
import { CitaDetailData } from "@/modules/citas-admin/model/dto/props/CitaDetailModalProps";

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ width: "36px", height: "36px", border: "4px solid #E5E7EB", borderTop: "4px solid #4F8A7C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const especieMap: Record<string, string> = { dog: "Perro", cat: "Gato", bird: "Ave", other: "Otro" };

function mapToDetail(c: CitaVetUI): CitaDetailData {
  return {
    nombre:      c.paciente,
    raza:        c.raza,
    especie:     especieMap[c.species] ?? c.species,
    propietario: c.propietario,
    servicio:    c.servicio,
    hora:        c.hora,
    fecha:       c.fecha,
  };
}

export default function CitasVetPage() {
  const { filteredCitas, searchTerm, setSearchTerm, loading } = useCitasVetViewModel();
  const [filtroServicio, setFiltroServicio] = useState<FiltroServicioVet>("todas");
  const [selectedVer,    setSelectedVer]    = useState<CitaVetUI | null>(null);
  const [selectedEditar, setSelectedEditar] = useState<CitaVetUI | null>(null);

  if (loading) return <Spinner />;

  const citasFiltradas = filtroServicio === "todas"
    ? filteredCitas
    : filteredCitas.filter((c) => c.servicio === "Chequeo médico");

  return (
    <div style={{ padding: "32px", minHeight: "100vh" }}>
      <CitasVetHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filtroServicio={filtroServicio}
        onFiltroChange={setFiltroServicio}
      />
      <CitasVetTable
        citas={citasFiltradas}
        onVerCita={setSelectedVer}
        onEditarCita={setSelectedEditar}
      />
      {selectedVer && (
        <CitaDetailModal
          data={mapToDetail(selectedVer)}
          onClose={() => setSelectedVer(null)}
        />
      )}
      {selectedEditar && (
        <ConsultaNotasModal
          cita={selectedEditar}
          onClose={() => setSelectedEditar(null)}
        />
      )}
    </div>
  );
}