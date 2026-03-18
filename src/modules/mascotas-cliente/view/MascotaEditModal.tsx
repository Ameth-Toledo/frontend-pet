import React, { useState } from "react";
import { MascotaEditModalProps } from "../model/dto/props/MascotaEditModalProps";
import { clienteMascotasService } from "../services/clienteMascotas.service";

const C = {
  green: "#4F8A7C", greenDark: "#3E6F63", white: "#FFFFFF",
  textMain: "#1F2937", textSub: "#6B7280", border: "#E5E7EB",
};

function Field({ label, value, onChange, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "13px", fontWeight: 600, color: C.textSub }}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: "100%", boxSizing: "border-box", border: `1px solid ${focused ? C.green : C.border}`, borderRadius: "8px", padding: "10px 12px", fontSize: "14px", color: C.textMain, outline: "none" }} />
    </div>
  );
}

export default function MascotaEditModal({ mascota, onClose, onGuardar }: MascotaEditModalProps) {
  const [nombre,   setNombre]   = useState(mascota.nombre);
  const [especie,  setEspecie]  = useState(mascota.especie);
  const [sexo,     setSexo]     = useState(mascota.sexo ?? '');
  const [peso,     setPeso]     = useState(String(mascota.peso ?? ''));
  const [fechaNac, setFechaNac] = useState(mascota.fecha_nacimiento ?? '');
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const handleGuardar = async () => {
    setSaving(true);
    setError(null);
    try {
      await clienteMascotasService.updateMascota(mascota.id, {
        nombre,
        especie,
        sexo:              sexo || null,
        peso:              peso ? Number(peso) : null,
        fecha_nacimiento:  fechaNac || null,
      } as never);
      onGuardar();
    } catch {
      setError('Error al guardar los cambios.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px" }}>
      <div style={{ backgroundColor: C.white, width: "100%", maxWidth: "480px", borderRadius: "18px", padding: "32px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: C.textMain, margin: 0 }}>Editar mascota</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "18px", color: C.textSub, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
          <Field label="Nombre"            value={nombre}   onChange={setNombre} />
          <Field label="Especie"           value={especie}  onChange={setEspecie} />
          <Field label="Sexo"              value={sexo}     onChange={setSexo} />
          <Field label="Peso (kg)"         value={peso}     onChange={setPeso} type="number" />
          <Field label="Fecha nacimiento"  value={fechaNac} onChange={setFechaNac} type="date" />
        </div>

        {error && (
          <div style={{ backgroundColor: "#FEE2E2", border: "1px solid #FECACA", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#B91C1C", marginBottom: "16px" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button onClick={onClose}
            style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "9px 18px", fontSize: "14px", color: C.textSub, cursor: "pointer" }}>
            Cancelar
          </button>
          <button onClick={handleGuardar} disabled={saving}
            style={{ backgroundColor: saving ? "#9ECEC6" : C.green, color: C.white, border: "none", borderRadius: "8px", padding: "9px 20px", fontSize: "14px", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer" }}
            onMouseEnter={(e) => { if (!saving) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.greenDark; }}
            onMouseLeave={(e) => { if (!saving) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}