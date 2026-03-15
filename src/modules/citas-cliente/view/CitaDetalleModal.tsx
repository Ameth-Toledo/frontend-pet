import React from "react";
import { CitaUI } from "../model/ui.model";
import { CitaDetalleModalProps } from "../model/dto/props/CitaDetalleModalProps";


const ESTADO_STYLES: Record<CitaUI["estado"], { bg: string; color: string }> = {
  CONFIRMADA: { bg: "#dcfce7", color: "#15803d" },
  CANCELADA:  { bg: "#fee2e2", color: "#b91c1c" },
  COMPLETADA: { bg: "#f3f4f6", color: "#6b7280" },
};

export default function CitaDetalleModal({ cita, onClose }: CitaDetalleModalProps) {
  const { bg, color } = ESTADO_STYLES[cita.estado];

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
      <div style={{ backgroundColor: "#FFFFFF", width: "500px", borderRadius: "16px", padding: "32px", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>

        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", fontSize: "18px", color: "#9CA3AF", cursor: "pointer" }}>
          ✕
        </button>

        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1F2937", marginBottom: "20px" }}>
          Detalle de la cita
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", color: "#374151" }}>
          <p><strong>Mascota:</strong> {cita.mascotaNombre}</p>
          <p><strong>Motivo:</strong>  {cita.motivo}</p>
          <p><strong>Fecha:</strong>   {cita.fechaFormateada}</p>
          <p><strong>Hora:</strong>    {cita.hora}</p>
          <span style={{ display: "inline-block", backgroundColor: bg, color, fontSize: "12px", fontWeight: 600, padding: "4px 12px", borderRadius: "20px", marginTop: "8px" }}>
            {cita.estado}
          </span>
        </div>
      </div>
    </div>
  );
}