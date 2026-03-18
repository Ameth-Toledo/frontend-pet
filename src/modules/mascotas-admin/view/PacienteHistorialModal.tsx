"use client";

import React, { useEffect, useState } from "react";
import { PacienteHistorialModalProps } from "../model/dto/props/PacienteHistorialModalProps";
import { apiClient } from "@/lib/axios";

interface HistorialEntry {
  id_historial:  number;
  fecha:         string;
  diagnostico:   string;
  tratamiento:   string;
  observaciones: string;
  veterinario?:  string;
}

export default function PacienteHistorialModal({ paciente, onClose }: PacienteHistorialModalProps) {
  const [historial, setHistorial] = useState<HistorialEntry[]>([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res  = await apiClient.get(`/historial/mascota/${paciente.id}`);
        const data = Array.isArray(res.data?.data) ? res.data.data : [];
        setHistorial(data);
      } catch {
        setHistorial([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [paciente.id]);

  function formatFecha(iso: string): string {
    return new Date(iso).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  }

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={onClose}>
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", width: "100%", maxWidth: "640px", maxHeight: "88vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.18)" }} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: "24px 28px 16px", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, backgroundColor: "#FFFFFF", zIndex: 1, borderRadius: "16px 16px 0 0" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1F2937", marginBottom: "2px" }}>{paciente.nombre}</h2>
            <p style={{ fontSize: "13px", color: "#6B7280" }}>{paciente.especieLabel} · {paciente.raza} · {paciente.propietario}</p>
            <p style={{ fontSize: "12px", color: "#9CA3AF" }}>{paciente.emailPropietario}</p>
          </div>
          <button onClick={onClose} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "none", backgroundColor: "#F3F4F6", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B7280" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1F2937", marginBottom: "20px" }}>Historial Clínico</h3>

          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
              <div style={{ width: "32px", height: "32px", border: "3px solid #E5E7EB", borderTop: "3px solid #4F8A7C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : historial.length === 0 ? (
            <p style={{ fontSize: "14px", color: "#9CA3AF", textAlign: "center", padding: "32px 0" }}>Sin historial clínico registrado.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {historial.map((h, i) => (
                <div key={h.id_historial} style={{ display: "flex", gap: "16px", paddingBottom: i < historial.length - 1 ? "20px" : "0" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#4F8A7C", marginTop: "6px" }} />
                    {i < historial.length - 1 && <div style={{ width: "2px", flex: 1, backgroundColor: "#E6F4F1", marginTop: "6px" }} />}
                  </div>
                  <div style={{ flex: 1, border: "1px solid #F3F4F6", borderRadius: "12px", padding: "16px 20px" }}>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#4F8A7C", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "4px" }}>{formatFecha(h.fecha)}</p>
                    <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#1F2937", marginBottom: "14px" }}>{h.diagnostico}</h4>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#4F8A7C", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "6px" }}>Observaciones</p>
                    <p style={{ fontSize: "13px", color: "#4B5563", lineHeight: "1.65", marginBottom: "14px" }}>{h.observaciones}</p>
                    {h.tratamiento && (
                      <>
                        <p style={{ fontSize: "11px", fontWeight: 700, color: "#4F8A7C", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "6px" }}>Tratamiento</p>
                        <p style={{ fontSize: "13px", color: "#4B5563", lineHeight: "1.65", marginBottom: "14px" }}>{h.tratamiento}</p>
                      </>
                    )}
                    {h.veterinario && (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                          <rect x="9" y="2" width="6" height="4" rx="1" /><path d="M4 6h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" />
                        </svg>
                        <span style={{ fontSize: "12px", color: "#6B7280" }}>{h.veterinario}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 28px 24px", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ backgroundColor: "#4F8A7C", color: "#FFFFFF", border: "none", borderRadius: "10px", padding: "10px 28px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#3E6F63"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4F8A7C"; }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}