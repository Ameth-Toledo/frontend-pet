"use client";
import React, { useState } from "react";
import { ConsultaNotasModalProps } from "../model/dto/props/ConsultaNotasModalProps";

export default function ConsultaNotasModal({ cita, onClose }: ConsultaNotasModalProps) {
  const [observaciones, setObservaciones] = useState("");
  const [vacuna, setVacuna]               = useState("");
  const [focused, setFocused]             = useState<"obs" | "vac" | null>(null);

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.40)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px" }} onClick={onClose}>
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", padding: "32px 36px", width: "100%", maxWidth: "500px" }} onClick={(e) => e.stopPropagation()}>

        <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#1F2937", marginBottom: "4px" }}>Notas de consulta</h2>
        <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "28px" }}>Registra las observaciones y vacunas aplicadas en esta visita.</p>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#1F2937", marginBottom: "8px" }}>Observaciones Médicas</label>
          <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)}
            onFocus={() => setFocused("obs")} onBlur={() => setFocused(null)}
            placeholder="Escribe aquí los detalles del chequeo, hallazgos físicos y recomendaciones..." rows={4}
            style={{ width: "100%", border: focused === "obs" ? "1.5px solid #4F8A7C" : "1.5px solid #E5E7EB", borderRadius: "10px", padding: "12px 14px", fontSize: "13px", color: "#1F2937", resize: "vertical", outline: "none", fontFamily: "inherit", backgroundColor: "#FFFFFF", boxSizing: "border-box" }} />
        </div>

        <div style={{ marginBottom: "32px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#1F2937", marginBottom: "8px" }}>Vacuna aplicada</label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", border: focused === "vac" ? "1.5px solid #4F8A7C" : "1.5px solid #E5E7EB", borderRadius: "10px", padding: "10px 14px", backgroundColor: "#FFFFFF" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M18 2l4 4-10 10H8v-4L18 2z" /><path d="M8 16l-5 5" /><path d="M14 8l2 2" />
            </svg>
            <input type="text" value={vacuna} onChange={(e) => setVacuna(e.target.value)}
              onFocus={() => setFocused("vac")} onBlur={() => setFocused(null)}
              placeholder="Ej. Antirrábica, Parvovirus..."
              style={{ border: "none", outline: "none", fontSize: "13px", color: "#1F2937", backgroundColor: "transparent", width: "100%" }} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "16px" }}>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "14px", fontWeight: 500, color: "#6B7280", cursor: "pointer", padding: "8px 4px" }}>Cancelar</button>
          <button onClick={onClose} style={{ backgroundColor: "#4F8A7C", border: "none", borderRadius: "10px", padding: "10px 24px", fontSize: "14px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#3E6F63"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4F8A7C"; }}>
            Guardar notas
          </button>
        </div>
      </div>
    </div>
  );
}