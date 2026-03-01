import React from "react";
import { CitaUI } from "../model/ui.model";
import EstadoBadge from "./EstadoBadge";

const C = {
  green: "#4F8A7C",
  white: "#FFFFFF",
  textMain: "#1F2937",
  textSub:  "#6B7280",
  textFaded:"#9CA3AF",
  border:   "#E5E7EB",
};

interface CitaCardProps {
  cita: CitaUI;
}

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" strokeLinecap="round" />
    </svg>
  );
}

export default function CitaCard({ cita }: CitaCardProps) {
  const isCompletada = cita.estado === "COMPLETADA";

  return (
    <div
      style={{
        backgroundColor: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: "16px",
        padding: "20px 24px",
        boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top row — date + hour */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        {/* Date */}
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <CalendarIcon />
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: isCompletada ? C.textFaded : C.green,
              letterSpacing: "0.04em",
            }}
          >
            {cita.fechaFormateada}
          </span>
        </div>

        {/* Hour */}
        <span
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: isCompletada ? C.textFaded : C.textSub,
          }}
        >
          {cita.hora}
        </span>
      </div>

      {/* Title */}
      <p
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: isCompletada ? C.textFaded : C.textMain,
          textDecoration: isCompletada ? "line-through" : "none",
          marginBottom: "10px",
        }}
      >
        {cita.titulo}
      </p>

      {/* Badge */}
      <EstadoBadge estado={cita.estado} />
    </div>
  );
}