import React from "react";
import { CitaDetalleModalProps } from "../model/dto/props/CitaDetalleModalProps";

const ESTADO_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  PENDIENTE:  { bg: "#FEF9C3", color: "#854D0E", label: "Pendiente"  },
  CONFIRMADA: { bg: "#DCFCE7", color: "#15803D", label: "Confirmada" },
  CANCELADA:  { bg: "#FEE2E2", color: "#B91C1C", label: "Cancelada"  },
  COMPLETADA: { bg: "#F3F4F6", color: "#6B7280", label: "Completada" },
  ATENDIDA:   { bg: "#E0F2FE", color: "#0369A1", label: "Atendida"   },
};

const C = {
  white: "#FFFFFF", textMain: "#1F2937", textSub: "#6B7280",
  border: "#F3F4F6", green: "#4F8A7C",
};

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 0", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#E6F4F1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: "11px", fontWeight: 600, color: C.textSub, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 2px 0" }}>{label}</p>
        <p style={{ fontSize: "14px", fontWeight: 500, color: C.textMain, margin: 0 }}>{value}</p>
      </div>
    </div>
  );
}

export default function CitaDetalleModal({ cita, onClose }: CitaDetalleModalProps) {
  const estado = ESTADO_STYLES[cita.estado] ?? { bg: "#F3F4F6", color: "#6B7280", label: cita.estado };

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px" }}>
      <div style={{ backgroundColor: C.white, width: "100%", maxWidth: "480px", borderRadius: "20px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ padding: "24px 28px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: C.textMain, margin: "0 0 4px 0" }}>Detalle de la cita</h2>
            <span style={{ display: "inline-block", backgroundColor: estado.bg, color: estado.color, fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", letterSpacing: "0.04em" }}>
              {estado.label}
            </span>
          </div>
          <button onClick={onClose}
            style={{ width: "32px", height: "32px", borderRadius: "8px", border: "none", backgroundColor: C.border, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.textSub, fontSize: "16px" }}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "8px 28px 24px" }}>
          <InfoRow label="Mascota" value={cita.mascotaNombre}
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2"><ellipse cx="12" cy="16" rx="5" ry="4"/><circle cx="6" cy="10" r="2"/><circle cx="18" cy="10" r="2"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="7" r="2"/></svg>}
          />
          <InfoRow label="Motivo" value={cita.motivo}
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
          />
          <InfoRow label="Fecha" value={cita.fechaFormateada}
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/></svg>}
          />
          <InfoRow label="Hora" value={cita.hora}
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
          />
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 28px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose}
            style={{ backgroundColor: C.green, color: C.white, border: "none", borderRadius: "10px", padding: "10px 24px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#3E6F63"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}