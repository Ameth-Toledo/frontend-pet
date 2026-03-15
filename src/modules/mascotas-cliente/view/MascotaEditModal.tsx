import React from "react";
import { MascotaEditModalProps } from "../model/dto/props/MascotaEditModalProps";

export default function MascotaEditModal({ mascota, onClose }: MascotaEditModalProps) {
  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
      <div style={{ backgroundColor: "#FFFFFF", width: "520px", borderRadius: "16px", padding: "32px", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", fontSize: "18px", color: "#9CA3AF", cursor: "pointer" }}>✕</button>

        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1F2937", marginBottom: "20px" }}>Editar mascota</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input defaultValue={mascota.nombre} style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "8px 12px", fontSize: "14px" }} />
          <input defaultValue={mascota.especie} style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "8px 12px", fontSize: "14px" }} />
          <input defaultValue={mascota.edad} style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "8px 12px", fontSize: "14px" }} />
          <button style={{ width: "100%", backgroundColor: "#4F8A7C", color: "#FFFFFF", border: "none", borderRadius: "8px", padding: "10px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}