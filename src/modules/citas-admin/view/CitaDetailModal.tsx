"use client";
import React from "react";
import { CitaDetailModalProps } from "../model/dto/props/CitaDetailModalProps";

const C = {
  green: "#4F8A7C",
  white: "#FFFFFF",
  textMain: "#1F2937",
  textSub: "#6B7280",
  border: "#E5E7EB",
  bg: "#F9FAFB",
};

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontSize: "13px", color: C.textSub, fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: "13px", color: C.textMain, fontWeight: 600, textAlign: "right", maxWidth: "60%" }}>{value}</span>
    </div>
  );
}

export default function CitaDetailModal({ data, onClose }: CitaDetailModalProps) {
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: C.white, borderRadius: "16px", width: "100%", maxWidth: "460px", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", overflow: "hidden" }}
      >
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "17px", fontWeight: 700, color: C.textMain, margin: 0 }}>Detalle de cita</h2>
            <p style={{ fontSize: "12px", color: C.textSub, margin: "4px 0 0 0" }}>{data.fecha ?? ""}</p>
          </div>
          <button onClick={onClose} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "none", backgroundColor: "#F3F4F6", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 24px" }}>

          {/* Paciente */}
          <p style={{ fontSize: "11px", fontWeight: 700, color: C.green, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>Paciente</p>
          <Row label="Nombre" value={data.nombre} />
          <Row label="Especie" value={data.especie} />
          <Row label="Raza" value={data.raza} />

          {/* Cita */}
          <p style={{ fontSize: "11px", fontWeight: 700, color: C.green, letterSpacing: "0.06em", textTransform: "uppercase", margin: "16px 0 8px 0" }}>Cita</p>
          <Row label="Servicio" value={data.servicio} />
          <Row label="Hora" value={data.hora} />
          <Row label="Estado" value={data.estado} />
          <Row label="Motivo" value={data.motivoDetalle} />

          {/* Propietario */}
          <p style={{ fontSize: "11px", fontWeight: 700, color: C.green, letterSpacing: "0.06em", textTransform: "uppercase", margin: "16px 0 8px 0" }}>Propietario</p>
          <Row label="Nombre" value={data.propietario} />
          <Row label="Email" value={data.emailCliente} />
          <Row label="Teléfono" value={data.telefonoCliente} />
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{ backgroundColor: C.green, color: C.white, border: "none", borderRadius: "10px", padding: "10px 28px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#3E6F63"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}