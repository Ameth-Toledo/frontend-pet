"use client";
import React, { useState } from "react";

interface AgendarCitaModalProps {
  onClose: () => void;
  onAgendar: (mascotaId: string, fecha: string, hora: string, motivo: string) => void;
}

const C = {
  green: "#5BAA9C", greenDark: "#4A9488", greenLight: "#E6F4F1",
  white: "#FFFFFF", textMain: "#1F2937", textSub: "#6B7280",
  border: "#E5E7EB", error: "#EF4444",
};

const mockMascotas = [
  { id: "1", nombre: "Firulais" },
  { id: "2", nombre: "Luna" },
];

const HORARIOS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "15:00", "15:30", "16:00", "16:30"];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "13px", fontWeight: 600, color: C.textMain }}>{label}</label>
      {children}
    </div>
  );
}

export default function AgendarCitaModal({ onClose, onAgendar }: AgendarCitaModalProps) {
  const [mascotaId, setMascotaId] = useState(mockMascotas[0].id);
  const [fecha,     setFecha]     = useState("");
  const [hora,      setHora]      = useState(HORARIOS[0]);
  const [motivo,    setMotivo]    = useState("");
  const [errors,    setErrors]    = useState<Record<string, string>>({});

  const inputStyle = (hasError?: boolean) => ({
    padding: "10px 13px", borderRadius: "10px",
    border: `1px solid ${hasError ? C.error : C.border}`,
    fontSize: "13px", color: C.textMain, outline: "none",
    width: "100%", boxSizing: "border-box" as const,
    backgroundColor: C.white,
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fecha)         e.fecha  = "Selecciona una fecha";
    if (!motivo.trim()) e.motivo = "El motivo es obligatorio";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px" }}>
      <div style={{ backgroundColor: C.white, borderRadius: "20px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", padding: "32px", width: "100%", maxWidth: "480px" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: C.textMain, margin: 0 }}>Agendar cita</h2>
            <p style={{ fontSize: "13px", color: C.textSub, margin: "4px 0 0 0" }}>Programa una cita para tu mascota</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "20px", color: C.textSub, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Field label="Mascota">
            <select value={mascotaId} onChange={(e) => setMascotaId(e.target.value)} style={inputStyle()}>
              {mockMascotas.map((m) => <option key={m.id} value={m.id}>{m.nombre}</option>)}
            </select>
          </Field>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Fecha">
              <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} style={inputStyle(!!errors.fecha)} />
              {errors.fecha && <p style={{ fontSize: "11px", color: C.error, margin: 0 }}>{errors.fecha}</p>}
            </Field>
            <Field label="Hora">
              <select value={hora} onChange={(e) => setHora(e.target.value)} style={inputStyle()}>
                {HORARIOS.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Motivo de la consulta">
            <textarea value={motivo} onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ej. Vacunación anual, revisión general..." rows={3}
              style={{ ...inputStyle(!!errors.motivo), resize: "none", fontFamily: "inherit" }} />
            {errors.motivo && <p style={{ fontSize: "11px", color: C.error, margin: 0 }}>{errors.motivo}</p>}
          </Field>

          <div style={{ backgroundColor: C.greenLight, borderRadius: "10px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p style={{ fontSize: "12px", color: C.green, margin: 0 }}>
              Un veterinario disponible será asignado automáticamente.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
          <button onClick={onClose}
            style={{ flex: 1, padding: "11px", borderRadius: "10px", border: `1px solid ${C.border}`, backgroundColor: C.white, fontSize: "14px", color: C.textSub, cursor: "pointer" }}>
            Cancelar
          </button>
          <button onClick={() => { if (validate()) onAgendar(mascotaId, fecha, hora, motivo); }}
            style={{ flex: 2, padding: "11px", borderRadius: "10px", border: "none", backgroundColor: C.green, color: C.white, fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.greenDark; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}>
            Confirmar cita
          </button>
        </div>
      </div>
    </div>
  );
}