"use client";

import React from "react";
import { useAnalisisViewModel } from "@/modules/analisis/viewmodel/useAnalisisViewModel";
import MetricsCards from "./MetricsCards";
import AppointmentsChart from "./AppointmentsChart";
import ServicesDistribution from "./ServicesDistribution";

function SkeletonCard() {
  return (
    <div style={{ flex: 1, minWidth: "220px", height: "130px", backgroundColor: "#F3F4F6", borderRadius: "16px", animation: "pulse 1.4s ease-in-out infinite" }} />
  );
}

export default function AnalisisPage() {
  const { metrics, loading, error } = useAnalisisViewModel();

  return (
    <div style={{ padding: "32px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#1F2937", margin: 0 }}>Análisis</h1>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0 0" }}>
            Estadísticas y métricas generales del rendimiento de la clínica.
          </p>
        </div>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937", whiteSpace: "nowrap" }}>
          Dr. Smith
        </span>
      </div>

      {error && (
        <div style={{ backgroundColor: "#FDECEC", border: "1px solid #FECACA", borderRadius: "12px", padding: "14px 20px", fontSize: "14px", color: "#B91C1C", marginBottom: "24px" }}>
          {error}
        </div>
      )}

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

      {!loading && !error && metrics && (
        <>
          <MetricsCards metrics={metrics} />
          <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
            <AppointmentsChart data={metrics.appointmentsByMonth} />
            <ServicesDistribution data={metrics.serviceDistribution} totalLabel={metrics.totalServiciosLabel} />
          </div>
        </>
      )}
    </div>
  );
}
