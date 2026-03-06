"use client";

import React from "react";
import { useDashboardViewModel } from "../viewmodel/useDashboardViewModel";
import StatsCard from "./StatsCard";
import UpcomingAppointments from "./UpcomingAppoitments";
import RecentPatients from "./RecentPatients";

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="3" stroke="#4F8A7C" strokeWidth="2" />
      <path d="M3 9h18" stroke="#4F8A7C" strokeWidth="2" />
      <path d="M8 2v4M16 2v4" stroke="#4F8A7C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PawIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
      <div style={{ width: "36px", height: "36px", border: "4px solid #E5E7EB", borderTop: "4px solid #4F8A7C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function DashboardPage() {
  const { stats, upcomingAppointments, recentPatients, loading } = useDashboardViewModel();

  if (loading) return <Spinner />;

  return (
    <div style={{ padding: "32px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#1F2937", margin: 0 }}>Panel principal</h1>
        <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0 0" }}>
          Resumen general de la clínica veterinaria.
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "24px" }}>
        <StatsCard
          title="Citas de hoy"
          value={stats!.appointmentsToday}
          subtext={stats!.appointmentsTrend}
          icon={<CalendarIcon />}
        />
        <StatsCard
          title="Pacientes activos"
          value={stats!.activePatients}
          subtext={`${stats!.newPatientsThisWeek} pacientes nuevos esta semana`}
          icon={<PawIcon />}
        />
      </div>

      {/* Bottom section */}
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
        <UpcomingAppointments appointments={upcomingAppointments} />
        <RecentPatients patients={recentPatients} />
      </div>
    </div>
  );
}
