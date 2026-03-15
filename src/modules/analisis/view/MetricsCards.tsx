import React from "react";
import { MetricsCardsProps } from "../model/dto/props/MetricsCardsProps";
import { DashboardMetricsUI } from "../model/metrics.ui.model";

function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4F8A7C" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <path d="M3 9h18M8 2v4M16 2v4" strokeLinecap="round" />
    </svg>
  );
}

function PatientIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4F8A7C" strokeWidth="2">
      <circle cx="10" cy="7" r="4" />
      <path d="M4 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M19 8v6M22 11h-6" strokeLinecap="round" />
    </svg>
  );
}

interface CardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  trendLabel: string;
  trendPositive: boolean;
}

function MetricCard({ icon, label, value, trendLabel, trendPositive }: CardProps) {
  return (
    <div style={{ flex: 1, backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "24px 28px", display: "flex", flexDirection: "column", gap: "10px", position: "relative" }}>
      <div style={{ position: "absolute", top: "16px", right: "16px", backgroundColor: trendPositive ? "#E6F4F1" : "#FDECEC", color: trendPositive ? "#4F8A7C" : "#B91C1C", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "2px" }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          {trendPositive ? <polyline points="18 15 12 9 6 15" /> : <polyline points="6 9 12 15 18 9" />}
        </svg>
        {trendLabel}
      </div>
      <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "#E6F4F1", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <p style={{ fontSize: "13px", color: "#6B7280", fontWeight: 500 }}>{label}</p>
      <p style={{ fontSize: "38px", fontWeight: 800, color: "#1F2937", lineHeight: 1 }}>{value.toLocaleString("es-ES")}</p>
    </div>
  );
}

export default function MetricsCards({ metrics }: MetricsCardsProps) {
  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "24px", flexWrap: "wrap" }}>
      <MetricCard icon={<CalendarIcon />} label="Citas del Mes"     value={metrics.citasDelMes}     trendLabel={metrics.citasTrendLabel}           trendPositive={metrics.citasTrendPositive} />
      <MetricCard icon={<PatientIcon />}  label="Nuevos Pacientes"  value={metrics.nuevosPacientes} trendLabel={metrics.nuevosPacientesTrendLabel}  trendPositive={metrics.nuevosPacientesTrendPositive} />
    </div>
  );
}