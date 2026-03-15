import React from "react";
import { AppointmentCardProps } from "../model/dto/props/AppointmentCardProps";

const C = { green: "#5BAA9C", greenLight: "#E6F4F1", white: "#FFFFFF", textMain: "#1F2937", textSub: "#6B7280", border: "#E5E7EB" };

export default function AppointmentCard({ appointment, isLast = false }: AppointmentCardProps) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "14px 0", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: C.greenLight, borderRadius: "10px", padding: "7px 10px", minWidth: "44px", flexShrink: 0 }}>
        <span style={{ fontSize: "9px", fontWeight: 700, color: C.green, letterSpacing: "0.08em" }}>{appointment.mes}</span>
        <span style={{ fontSize: "20px", fontWeight: 800, color: C.textMain, lineHeight: 1.1 }}>{appointment.dia}</span>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "14px", fontWeight: 700, color: C.textMain, marginBottom: "3px" }}>{appointment.titulo}</p>
        <p style={{ fontSize: "12px", color: C.textSub }}>{appointment.doctor} · {appointment.hora}</p>
      </div>
    </div>
  );
}