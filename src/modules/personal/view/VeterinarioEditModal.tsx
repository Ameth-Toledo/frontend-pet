"use client";
import React, { useState } from "react";
import { VeterinarioEditModalProps } from "../model/dto/props/VeterinarioEditModalProps";

const C = {
  green: "#4F8A7C", greenDark: "#3E6F63", border: "#E5E7EB",
  textMain: "#1F2937", textSub: "#6B7280", bg: "#F9FAFB",
};

function Field({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "13px", fontWeight: 500, color: C.textMain }}>{label}</label>
      <input type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ padding: "10px 14px", borderRadius: "10px", border: `1px solid ${focused ? C.green : C.border}`, fontSize: "14px", color: C.textMain, backgroundColor: "#FFFFFF", outline: "none", width: "100%", boxSizing: "border-box" }} />
    </div>
  );
}

export default function VeterinarioEditModal({ veterinario, onClose }: VeterinarioEditModalProps) {
  const [nombre, setNombre]     = useState(veterinario.nombre);
  const [correo, setCorreo]     = useState(veterinario.email);
  const [telefono, setTelefono] = useState(veterinario.telefono);
  const [cedula, setCedula]     = useState(veterinario.cedula);

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.35)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={onClose}>
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", width: "100%", maxWidth: "560px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>

        <div style={{ padding: "24px 28px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: "17px", fontWeight: 700, color: C.textMain, marginBottom: "2px" }}>Editar veterinario</h2>
            <p style={{ fontSize: "13px", color: C.textSub }}>{veterinario.especialidad}</p>
          </div>
          <button onClick={onClose} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "none", backgroundColor: "#F3F4F6", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.textSub }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div style={{ padding: "24px 28px", backgroundColor: C.bg, display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <Field label="Nombre completo"    value={nombre}   onChange={setNombre}   placeholder="Nombre completo" />
            <Field label="Correo electrónico" value={correo}   onChange={setCorreo}   placeholder="correo@ejemplo.com" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <Field label="Teléfono"            value={telefono} onChange={setTelefono} placeholder="+52 555 123 4567" />
            <Field label="Cédula profesional"  value={cedula}   onChange={setCedula}   placeholder="#00000-XX" />
          </div>
        </div>

        <div style={{ padding: "16px 28px", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px", backgroundColor: "#FFFFFF" }}>
          <button onClick={onClose} style={{ padding: "10px 22px", borderRadius: "10px", border: "none", backgroundColor: "transparent", fontSize: "14px", fontWeight: 500, color: C.textSub, cursor: "pointer" }}>
            Cancelar
          </button>
          <button onClick={onClose} style={{ padding: "10px 26px", borderRadius: "10px", border: "none", backgroundColor: C.green, color: "#FFFFFF", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.greenDark; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
