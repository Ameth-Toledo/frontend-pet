"use client";
import React, { useState } from "react";
import { ClienteFormModalProps } from "../model/dto/props/ClienteFormModalProps";

const C = {
  green: "#4F8A7C", greenDark: "#3E6F63", greenLight: "#E6F4F1",
  greenBorder: "#C8E6E0", white: "#FFFFFF", textMain: "#1F2937",
  textSub: "#6B7280", border: "#E5E7EB", error: "#EF4444",
};

function FieldInput({ label, placeholder, value, onChange, error, type = "text" }: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; error?: string; type?: string;
}) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label style={{ fontSize: "13px", fontWeight: 600, color: C.textMain }}>{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ padding: "10px 13px", borderRadius: "10px", border: `1px solid ${error ? C.error : focused ? C.green : C.border}`, fontSize: "13px", color: C.textMain, backgroundColor: C.white, outline: "none", width: "100%", boxSizing: "border-box" }} />
      {error && <p style={{ fontSize: "11px", color: C.error }}>{error}</p>}
    </div>
  );
}

function generarContrasena(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 3; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return `PetCare-2024-${suffix}`;
}

export default function ClienteFormModal({ onClose }: ClienteFormModalProps) {
  const [nombre, setNombre]         = useState("");
  const [correo, setCorreo]         = useState("");
  const [telefono, setTelefono]     = useState("");
  const [contrasena, setContrasena] = useState("PetCare-2024-X9Z");
  const [errors, setErrors]         = useState<{ nombre?: string; correo?: string }>({});
  const [loading, setLoading]       = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (!correo.trim()) e.correo = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) e.correo = "Formato de correo inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    onClose();
  };

  const handleRegenerar = async () => {
    setRegenerating(true);
    await new Promise((r) => setTimeout(r, 300));
    setContrasena(generarContrasena());
    setRegenerating(false);
  };

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px" }}>
      <div style={{ backgroundColor: C.white, borderRadius: "16px", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", padding: "32px", width: "100%", maxWidth: "520px", maxHeight: "90vh", overflowY: "auto" }}>

        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: C.textMain, marginBottom: "4px" }}>Registrar nuevo cliente</h2>
          <p style={{ fontSize: "13px", color: C.textSub }}>Complete los datos para habilitar el acceso a la plataforma PetCare.</p>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <FieldInput label="Nombre completo" placeholder="Ej. Juan Pérez" value={nombre} onChange={setNombre} error={errors.nombre} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "20px" }}>
          <FieldInput label="Correo electrónico" placeholder="juan.perez@email.com" value={correo} onChange={setCorreo} error={errors.correo} type="email" />
          <FieldInput label="Teléfono" placeholder="+52 555 123 4567" value={telefono} onChange={setTelefono} />
        </div>

        <div style={{ backgroundColor: C.greenLight, border: `1px solid ${C.greenBorder}`, borderRadius: "12px", padding: "16px 18px", marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "8px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            <span style={{ fontSize: "13px", fontWeight: 700, color: C.textMain, textTransform: "uppercase", letterSpacing: "0.05em" }}>Credenciales de acceso</span>
          </div>
          <p style={{ fontSize: "10px", fontWeight: 700, color: C.textSub, letterSpacing: "0.08em", marginBottom: "8px" }}>CONTRASEÑA TEMPORAL</p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "9px 12px", marginBottom: "8px" }}>
            <span style={{ flex: 1, fontSize: "14px", fontWeight: 600, color: C.textMain }}>{contrasena}</span>
            <button onClick={() => navigator.clipboard.writeText(contrasena).catch(() => {})} title="Copiar"
              style={{ background: "none", border: "none", cursor: "pointer", color: C.textSub, display: "flex", padding: "2px" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
            </button>
            <button onClick={handleRegenerar} disabled={regenerating}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", color: C.green, fontSize: "12px", fontWeight: 600, opacity: regenerating ? 0.6 : 1 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: regenerating ? "spin 0.7s linear infinite" : "none" }}>
                <path d="M23 4v6h-6" /><path d="M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              Regenerar
            </button>
          </div>
          <p style={{ fontSize: "11px", color: C.textSub }}>Esta contraseña deberá ser cambiada por el usuario en su primer inicio de sesión.</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button onClick={handleSubmit} disabled={loading}
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", backgroundColor: loading ? "#9ECEC6" : C.green, color: C.white, border: "none", borderRadius: "10px", padding: "12px 20px", fontSize: "14px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}
            onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.greenDark; }}
            onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}>
            {loading ? "Registrando..." : "Confirmar registro"}
          </button>
          <button onClick={onClose} disabled={loading} style={{ background: "none", border: "none", fontSize: "14px", color: C.textSub, fontWeight: 500, cursor: "pointer", padding: "12px 16px" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.textMain; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.textSub; }}>
            Cancelar
          </button>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}