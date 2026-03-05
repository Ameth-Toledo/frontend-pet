"use client";

import { Search, Plus } from "lucide-react";

export default function HistorialClinicoPage() {
  const registros = [
    { id: 1, paciente: "Buddy",  raza: "Golden Retriever", fecha: "10 Oct, 2023", diagnostico: "Control de rutina",     veterinario: "Dr. Pérez",    notas: "Sin novedad, en buen estado general." },
    { id: 2, paciente: "Misty",  raza: "Siamés",           fecha: "08 Oct, 2023", diagnostico: "Infección respiratoria", veterinario: "Dr. Pérez",    notas: "Se recetó antibiótico por 7 días." },
    { id: 3, paciente: "Bella",  raza: "Border Terrier",   fecha: "05 Oct, 2023", diagnostico: "Post operatorio",        veterinario: "Dra. Salinas", notas: "Recuperación satisfactoria." },
  ];

  return (
    <div style={{ padding: "32px", backgroundColor: "#F7F9FB", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#1F2937", margin: 0 }}>Historial clínico</h1>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0 0" }}>
            Registro de consultas y diagnósticos por paciente.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
            <input
              placeholder="Buscar paciente..."
              style={{ height: "38px", paddingLeft: "34px", paddingRight: "14px", borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none" }}
            />
          </div>
          <button style={{ height: "38px", padding: "0 16px", borderRadius: "8px", backgroundColor: "#4F8A7C", color: "#FFFFFF", border: "none", fontSize: "13px", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
            <Plus size={14} /> Nuevo registro
          </button>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {registros.map((r) => (
          <div key={r.id} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "14px", padding: "20px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "#1F2937" }}>{r.paciente}</span>
                  <span style={{ fontSize: "11px", color: "#6B7280" }}>{r.raza}</span>
                </div>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#4F8A7C", margin: "0 0 6px 0" }}>{r.diagnostico}</p>
                <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>{r.notas}</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "24px" }}>
                <p style={{ fontSize: "12px", color: "#1F2937", fontWeight: 500, margin: 0 }}>{r.fecha}</p>
                <p style={{ fontSize: "11px", color: "#9CA3AF", margin: "4px 0 0 0" }}>{r.veterinario}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
