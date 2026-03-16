"use client";
import React, { useState } from "react";

interface NuevoPacienteModalProps {
  onClose: () => void;
  onGuardar: (data: { nombre: string; especie: string; raza: string; propietario: string }) => void;
}

const C = {
  green: "#4F8A7C", greenDark: "#3E6F63", greenLight: "#E6F4F1",
  white: "#FFFFFF", textMain: "#1F2937", textSub: "#6B7280",
  border: "#E5E7EB", error: "#EF4444",
};

function Field({ label, value, onChange, placeholder, error }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "13px", fontWeight: 600, color: C.textMain }}>{label}</label>
      <input type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ padding: "10px 13px", borderRadius: "10px", border: `1px solid ${error ? C.error : focused ? C.green : C.border}`, fontSize: "13px", color: C.textMain, backgroundColor: C.white, outline: "none", width: "100%", boxSizing: "border-box" as const }} />
      {error && <p style={{ fontSize: "11px", color: C.error, margin: 0 }}>{error}</p>}
    </div>
  );
}

export default function NuevoPacienteModal({ onClose, onGuardar }: NuevoPacienteModalProps) {
  const [nombre,      setNombre]      = useState("");
  const [especie,     setEspecie]     = useState("Perro");
  const [raza,        setRaza]        = useState("");
  const [propietario, setPropietario] = useState("");
  const [errors,      setErrors]      = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!nombre.trim())      e.nombre      = "El nombre es obligatorio";
    if (!raza.trim())        e.raza        = "La raza es obligatoria";
    if (!propietario.trim()) e.propietario = "El propietario es obligatorio";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onGuardar({ nombre, especie, raza, propietario });
  };

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px" }}>
      <div style={{ backgroundColor: C.white, borderRadius: "16px", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", padding: "32px", width: "100%", maxWidth: "480px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: C.textMain, margin: 0 }}>Nuevo paciente</h2>
          <p style={{ fontSize: "13px", color: C.textSub, margin: "4px 0 0 0" }}>Registra un nuevo paciente en tu base de datos clínica.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Field label="Nombre de la mascota" value={nombre} onChange={setNombre} placeholder="Ej. Firulais" error={errors.nombre} />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: 600, color: C.textMain }}>Especie</label>
            <select value={especie} onChange={(e) => setEspecie(e.target.value)}
              style={{ padding: "10px 13px", borderRadius: "10px", border: `1px solid ${C.border}`, fontSize: "13px", color: C.textMain, outline: "none" }}>
              <option>Perro</option><option>Gato</option><option>Ave</option><option>Otro</option>
            </select>
          </div>
          <Field label="Raza" value={raza} onChange={setRaza} placeholder="Ej. Golden Retriever" error={errors.raza} />
          <Field label="Propietario" value={propietario} onChange={setPropietario} placeholder="Nombre del dueño" error={errors.propietario} />
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "28px" }}>
          <button onClick={onClose}
            style={{ flex: 1, padding: "11px", borderRadius: "10px", border: `1px solid ${C.border}`, backgroundColor: C.white, fontSize: "14px", color: C.textSub, cursor: "pointer" }}>
            Cancelar
          </button>
          <button onClick={handleSubmit}
            style={{ flex: 2, padding: "11px", borderRadius: "10px", border: "none", backgroundColor: C.green, color: C.white, fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.greenDark; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}>
            Registrar paciente
          </button>
        </div>
      </div>
    </div>
  );
}
