"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useVeterinarioDashboardViewModel } from "../viewmodel/useVeterinarioDashboardViewModel";
import { VetAppointmentUI } from "../model/ui.model";
import VetStatsCard from "./VetStatsCard";
import VetUpcomingAppointments from "./VetUpcomingAppointments";
import VetRecentPatients from "./VetRecentPatients";
import { CitaDetailData } from "@/modules/citas-admin/model/dto/props/CitaDetailModalProps";
import CitaDetailModal from "@/modules/citas-admin/view/CitaDetailModal";

function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="3" stroke="#4F8A7C" strokeWidth="2" />
      <path d="M3 9h18" stroke="#4F8A7C" strokeWidth="2" />
      <path d="M8 2v4M16 2v4" stroke="#4F8A7C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PawIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="16" rx="5" ry="4" fill="#4F8A7C" />
      <circle cx="6" cy="10" r="2" fill="#4F8A7C" />
      <circle cx="18" cy="10" r="2" fill="#4F8A7C" />
      <circle cx="9" cy="7" r="2" fill="#4F8A7C" />
      <circle cx="15" cy="7" r="2" fill="#4F8A7C" />
    </svg>
  );
}

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

function mapToDetail(cita: VetAppointmentUI): CitaDetailData {
  return {
    nombre:          cita.patientName,
    raza:            cita._raw?.especie ?? cita.patientBreed,
    especie:         cita._raw?.especie ?? "",
    propietario:     cita.ownerName,
    servicio:        cita.service,
    hora:            cita.time,
    fecha:           cita._raw?.fecha ?? "",
    estado:          cita._raw?.estado ?? "",
    motivoDetalle:   cita._raw?.motivoDetalle ?? "",
    emailCliente:    cita._raw?.emailCliente ?? "",
    telefonoCliente: cita._raw?.telefonoCliente ?? "",
  };
}

export default function VeterinarioDashboardPage() {
  const { stats, upcomingAppointments, recentPatients, loading } =
    useVeterinarioDashboardViewModel();
  const [selectedCita, setSelectedCita] = useState<VetAppointmentUI | null>(null);
  const router = useRouter();

  if (loading) return <Spinner />;

  return (
    <div style={{ padding: "32px", backgroundColor: "#F7F9FB", minHeight: "100vh" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#1F2937", margin: 0 }}>
          Panel principal
        </h1>
        <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0 0" }}>
          Resumen de tu actividad veterinaria del día.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "24px" }}>
        <VetStatsCard
          title="Citas hoy"
          value={stats!.appointmentsToday}
          subtext={stats!.appointmentsTrend}
          icon={<CalendarIcon />}
        />
        <VetStatsCard
          title="Pacientes activos"
          value={stats!.activePatients}
          subtext={`${stats!.newPatientsThisWeek} nuevos esta semana`}
          icon={<PawIcon />}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        <VetUpcomingAppointments
          appointments={upcomingAppointments}
          onDetalles={setSelectedCita}
          onVerTodas={() => router.push("/veterinario/citas")}
        />
        <VetRecentPatients patients={recentPatients} />
      </div>

      {selectedCita && (
        <CitaDetailModal
          data={mapToDetail(selectedCita)}
          onClose={() => setSelectedCita(null)}
        />
      )}
    </div>
  );
}
