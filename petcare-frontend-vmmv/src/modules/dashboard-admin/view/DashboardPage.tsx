"use client";

import React from "react";
import { useDashboardViewModel } from "../viewmodel/useDashboardViewModel";
import StatsCard from "./StatsCard";
import UpcomingAppointments from "./UpcomingAppoitments";
import RecentPatients from "./RecentPatients";

// ─── Icons ────────────────────────────────────────────────────────────────────
function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="3" stroke="#6BAF9F" strokeWidth="2" />
      <path d="M3 9h18" stroke="#6BAF9F" strokeWidth="2" />
      <path d="M8 2v4M16 2v4" stroke="#6BAF9F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PawIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="16" rx="5" ry="4" fill="#6BAF9F" />
      <circle cx="6" cy="10" r="2" fill="#6BAF9F" />
      <circle cx="18" cy="10" r="2" fill="#6BAF9F" />
      <circle cx="9" cy="7" r="2" fill="#6BAF9F" />
      <circle cx="15" cy="7" r="2" fill="#6BAF9F" />
    </svg>
  );
}

function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#F8FAF9",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "4px solid #E5E7EB",
          borderTop: "4px solid #6BAF9F",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "28px",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1F2937" }}>Panel principal</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "10px",
            padding: "8px 16px",
            width: "220px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span style={{ color: "#9CA3AF", fontSize: "14px" }}>Buscar</span>
        </div>
        <p style={{ fontSize: "13px", fontWeight: 700, color: "#1F2937" }}>Juan Pérez</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { stats, upcomingAppointments, recentPatients, loading } = useDashboardViewModel();

  if (loading) return <Spinner />;

  return (
    <>
      <Navbar />

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
    </>
  );
}
