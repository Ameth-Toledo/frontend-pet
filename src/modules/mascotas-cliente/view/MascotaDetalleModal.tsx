import React from "react";
import { MascotaDetalleModalProps } from "../model/dto/props/MascotaDetalleModalProps";

const C = {
  green: "#4F8A7C", white: "#FFFFFF",
  textMain: "#1F2937", textSub: "#6B7280", border: "#E5E7EB",
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontSize: "13px", fontWeight: 600, color: C.textSub }}>{label}</span>
      <span style={{ fontSize: "14px", color: C.textMain }}>{value || '—'}</span>
    </div>
  );
}

export default function MascotaDetalleModal({ mascota, onClose }: MascotaDetalleModalProps) {
  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px" }}>
      <div style={{ backgroundColor: C.white, width: "100%", maxWidth: "460px", borderRadius: "18px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>

        {/* Header */}
        <div style={{ padding: "24px 28px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: C.textMain, margin: "0 0 2px 0" }}>{mascota.nombre}</h2>
            <p style={{ fontSize: "13px", color: C.textSub, margin: 0 }}>{mascota.especie}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "18px", color: C.textSub, cursor: "pointer" }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: "8px 28px 20px" }}>
          <InfoRow label="Nombre"           value={mascota.nombre} />
          <InfoRow label="Especie"          value={mascota.especie} />
          <InfoRow label="Sexo"             value={mascota.sexo ?? '—'} />
          <InfoRow label="Peso"             value={mascota.peso ? `${mascota.peso} kg` : '—'} />
          <InfoRow label="Fecha nacimiento" value={mascota.fecha_nacimiento ?? '—'} />
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 28px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose}
            style={{ backgroundColor: C.green, color: C.white, border: "none", borderRadius: "8px", padding: "10px 24px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#3E6F63"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}