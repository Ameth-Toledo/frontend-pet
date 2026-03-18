import React from "react";
import EstadoBadge from "./EstadoBadge";
import { CitaCardProps } from "../model/dto/props/CitaCardProps";

const C = {
  green: "#4F8A7C", greenLight: "#E6F4F1",
  white: "#FFFFFF", textMain: "#1F2937",
  textSub: "#6B7280", textFaded: "#9CA3AF", border: "#E5E7EB",
};

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

export default function CitaCard({ cita, onClick }: CitaCardProps & { onClick?: () => void }) {
  const isCompletada = cita.estado === "COMPLETADA";
  const isPendiente  = cita.estado === "PENDIENTE";

  return (
    <div onClick={onClick}
      style={{
        backgroundColor: C.white,
        border: `1px solid ${isPendiente ? "#D1FAE5" : C.border}`,
        borderRadius: "16px",
        padding: "20px 24px",
        boxShadow: isPendiente ? "0 2px 12px rgba(79,138,124,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.15s, box-shadow 0.15s",
        borderLeft: `4px solid ${isCompletada ? C.border : C.green}`,
        opacity: isCompletada ? 0.7 : 1,
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(79,138,124,0.12)";
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = isPendiente ? "0 2px 12px rgba(79,138,124,0.08)" : "0 1px 4px rgba(0,0,0,0.04)";
        }
      }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: isCompletada ? C.textFaded : C.green }}>
            <CalendarIcon />
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {cita.fechaFormateada}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: C.textSub }}>
            <ClockIcon />
            <span style={{ fontSize: "13px", fontWeight: 500 }}>{cita.hora}</span>
          </div>
        </div>
        <EstadoBadge estado={cita.estado} />
      </div>

      {/* Divider */}
      <div style={{ height: "1px", backgroundColor: C.border, marginBottom: "14px" }} />

      {/* Motivo */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
        <div style={{ marginTop: "1px", color: isCompletada ? C.textFaded : C.green, flexShrink: 0 }}>
          <NoteIcon />
        </div>
        <p style={{
          fontSize: "14px", fontWeight: 600,
          color: isCompletada ? C.textFaded : C.textMain,
          textDecoration: isCompletada ? "line-through" : "none",
          margin: 0, lineHeight: 1.4,
        }}>
          {cita.titulo}
        </p>
      </div>
    </div>
  );
}