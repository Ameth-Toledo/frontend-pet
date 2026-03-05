"use client";

import { Search, Filter, Plus, Eye, Pencil } from "lucide-react";

export default function MisPacientesPage() {
  const pacientes = [
    { id: 1, nombre: "Buddy",  especie: "Perro", raza: "Golden Retriever", propietario: "Sarah Jenkins",  estado: "ACTIVO" },
    { id: 2, nombre: "Misty",  especie: "Gato",  raza: "Siamés",           propietario: "Mark Thompson",  estado: "ACTIVO" },
    { id: 3, nombre: "Bella",  especie: "Perro", raza: "Border Terrier",   propietario: "Linda Garcia",   estado: "INACTIVO" },
  ];

  return (
    <div style={{ padding: "32px", backgroundColor: "#F7F9FB", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#1F2937", margin: 0 }}>Mis pacientes</h1>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0 0" }}>
            Gestión integral de la base de datos clínica.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
            <input
              placeholder="Buscar pacientes..."
              style={{ height: "38px", paddingLeft: "34px", paddingRight: "14px", borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none" }}
            />
          </div>
          <button style={{ height: "38px", padding: "0 14px", borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#FFFFFF", cursor: "pointer" }}>
            <Filter size={14} /> Filtrar
          </button>
          <button style={{ height: "38px", padding: "0 16px", borderRadius: "8px", backgroundColor: "#4F8A7C", color: "#FFFFFF", border: "none", fontSize: "13px", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
            <Plus size={14} /> Nuevo paciente
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1.5fr 1fr 80px", backgroundColor: "#F9FAFB", padding: "12px 24px", fontSize: "11px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          <div>Mascota</div>
          <div>Especie / Raza</div>
          <div>Propietario</div>
          <div>Estado</div>
          <div style={{ textAlign: "right" }}>Acciones</div>
        </div>

        {pacientes.map((p, i) => (
          <div key={p.id} style={{
            display: "grid", gridTemplateColumns: "1fr 1.5fr 1.5fr 1fr 80px",
            alignItems: "center", padding: "16px 24px", fontSize: "13px",
            borderTop: "1px solid #F3F4F6",
          }}>
            <div style={{ fontWeight: 600, color: "#1F2937" }}>{p.nombre}</div>
            <div>
              <p style={{ fontWeight: 600, color: "#1F2937", margin: 0 }}>{p.especie}</p>
              <p style={{ fontSize: "11px", color: "#6B7280", margin: "2px 0 0 0" }}>{p.raza}</p>
            </div>
            <div style={{ color: "#6B7280" }}>{p.propietario}</div>
            <div>
              <span style={{
                padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600,
                backgroundColor: p.estado === "ACTIVO" ? "#E6F4F1" : "#F3F4F6",
                color: p.estado === "ACTIVO" ? "#2F6B62" : "#6B7280",
              }}>
                {p.estado}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", color: "#9CA3AF" }}>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}><Eye size={15} /></button>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}><Pencil size={15} /></button>
            </div>
          </div>
        ))}

        {/* Footer */}
        <div style={{ padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "#6B7280", borderTop: "1px solid #F3F4F6" }}>
          <span>Mostrando 3 de 128 pacientes</span>
          <div style={{ display: "flex", gap: "6px" }}>
            {[1, 2, 3].map((n) => (
              <button key={n} style={{
                width: "30px", height: "30px", borderRadius: "6px", fontSize: "12px", cursor: "pointer",
                border: n === 2 ? "none" : "1px solid #E5E7EB",
                backgroundColor: n === 2 ? "#4F8A7C" : "#FFFFFF",
                color: n === 2 ? "#FFFFFF" : "#6B7280",
              }}>{n}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
