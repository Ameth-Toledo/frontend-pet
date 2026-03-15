import React from "react";
import { MascotaDetalleModalProps } from "../model/dto/props/MascotaDetalleModalProps";

export default function MascotaDetalleModal({ mascota, onClose }: MascotaDetalleModalProps) {
  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
      <div style={{ backgroundColor: "#FFFFFF", width: "520px", borderRadius: "16px", padding: "32px", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", fontSize: "18px", color: "#9CA3AF", cursor: "pointer" }}>✕</button>

        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1F2937", marginBottom: "20px" }}>Perfil de mascota</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", color: "#374151" }}>
          <p><strong>Nombre:</strong> {mascota.nombre}</p>
          <p><strong>Especie:</strong> {mascota.especie}</p>
          <p><strong>Edad:</strong> {mascota.edad} años</p>
        </div>
      </div>
    </div>
  );
}