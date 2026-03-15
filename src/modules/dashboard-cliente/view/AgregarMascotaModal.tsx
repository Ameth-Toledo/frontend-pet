import React, { useState } from "react";
import { AgregarMascotaModalProps } from "../model/dto/props/AgregarMascotaModalProps";

const C = { green: "#5BAA9C", border: "#E5E7EB" };

export default function AgregarMascotaModal({ onClose, onGuardar }: AgregarMascotaModalProps) {
  const [nombre, setNombre]   = useState("");
  const [especie, setEspecie] = useState("Perro");
  const [raza, setRaza]       = useState("");

  const handleGuardar = () => {
    if (!nombre.trim()) return;
    onGuardar(nombre, especie, raza);
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
      <div style={{ backgroundColor: "#FFFFFF", width: "420px", borderRadius: "16px", padding: "32px", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", fontSize: "18px", color: "#9CA3AF", cursor: "pointer" }}>✕</button>

        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1F2937", marginBottom: "24px" }}>Agregar mascota</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Nombre</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Firulais"
              style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "8px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Especie</label>
            <select value={especie} onChange={(e) => setEspecie(e.target.value)}
              style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "8px 12px", fontSize: "14px", outline: "none" }}>
              <option>Perro</option>
              <option>Gato</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Raza</label>
            <input value={raza} onChange={(e) => setRaza(e.target.value)} placeholder="Ej. Golden Retriever"
              style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "8px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
            <button onClick={onClose} style={{ padding: "8px 16px", borderRadius: "8px", border: `1px solid ${C.border}`, backgroundColor: "#FFFFFF", fontSize: "14px", cursor: "pointer" }}>
              Cancelar
            </button>
            <button onClick={handleGuardar} style={{ padding: "8px 16px", borderRadius: "8px", border: "none", backgroundColor: C.green, color: "#FFFFFF", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}