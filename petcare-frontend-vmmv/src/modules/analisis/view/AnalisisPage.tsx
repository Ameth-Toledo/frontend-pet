"use client";

import React from "react";
import { useAnalisisViewModel } from "@/modules/analisis/viewmodel/useAnalisisViewModel";
import MetricsCards from "./MetricsCards";
import AppointmentsChart from "./AppointmentsChart";
import ServicesDistribution from "./ServicesDistribution";

// ─── Spinner / Skeleton ───────────────────────────────────────────────────────
function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#F8FAF9" }}>
      <div
        style={{
          width: "40px", height: "40px",
          border: "4px solid #E5E7EB", borderTop: "4px solid #6BAF9F",
          borderRadius: "50%", animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div
      style={{
        flex: 1, minWidth: "220px", height: "130px",
        backgroundColor: "#F3F4F6", borderRadius: "16px",
        animation: "pulse 1.4s ease-in-out infinite",
      }}
    />
  );
}

function Navbar() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB",
            borderRadius: "10px", padding: "8px 14px", width: "220px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <span style={{ fontSize: "13px", color: "#9CA3AF" }}>Buscar métricas...</span>
        </div>
        <p style={{ fontSize: "13px", fontWeight: 700, color: "#1F2937" }}>Juan Pérez</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AnalisisPage() {
  const { metrics, loading, error } = useAnalisisViewModel();

  return (
    <>
      <Navbar />

      {/* Page header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#1F2937", marginBottom: "4px" }}>Análisis</h1>
        <p style={{ fontSize: "13px", color: "#6B7280" }}>
          Estadísticas y métricas generales del rendimiento de la clínica.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            backgroundColor: "#FDECEC", border: "1px solid #FECACA",
            borderRadius: "12px", padding: "14px 20px",
            fontSize: "14px", color: "#B91C1C", marginBottom: "24px",
          }}
        >
          {error}
        </div>
      )}

      {/* Loading skeletons */}
      {loading && (
        <>
          <div style={{ display: "flex", gap: "20px", marginBottom: "24px" }}>
            <SkeletonCard /><SkeletonCard />
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1, height: "280px", backgroundColor: "#F3F4F6", borderRadius: "16px" }} />
            <div style={{ width: "280px", height: "280px", backgroundColor: "#F3F4F6", borderRadius: "16px" }} />
          </div>
          <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:.5} }`}</style>
        </>
      )}

      {/* Content */}
      {!loading && !error && metrics && (
        <>
          <MetricsCards metrics={metrics} />
          <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
            <AppointmentsChart data={metrics.appointmentsByMonth} />
            <ServicesDistribution
              data={metrics.serviceDistribution}
              totalLabel={metrics.totalServiciosLabel}
            />
          </div>
        </>
      )}
    </>
  );
}