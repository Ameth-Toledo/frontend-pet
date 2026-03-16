"use client";
import React from "react";

interface CartillaVacunacionModalProps {
  mascotaNombre: string;
  onClose: () => void;
}

interface Vacuna {
  nombre: string;
  fechaAplicacion: string;
  proximaDosis: string;
  estado: "vigente" | "proxima" | "vencida";
}

const mockVacunas: Vacuna[] = [
  { nombre: "Antirrábica",                fechaAplicacion: "15 Ene 2024", proximaDosis: "15 Ene 2025", estado: "vigente" },
  { nombre: "Séxtuple Canina (DHPPI+L)", fechaAplicacion: "12 Dic 2023", proximaDosis: "12 Dic 2024", estado: "proxima" },
  { nombre: "Bordetella",                 fechaAplicacion: "10 Oct 2023", proximaDosis: "10 Oct 2024", estado: "vigente" },
  { nombre: "Giardia",                    fechaAplicacion: "15 Ago 2023", proximaDosis: "15 Ago 2024", estado: "vencida" },
];

const ESTADO_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  vigente: { bg: "#E6F4F1", color: "#4F8A7C", label: "Vigente"         },
  proxima: { bg: "#FFF4E5", color: "#D97706", label: "Próxima a vencer" },
  vencida: { bg: "#FDECEC", color: "#B91C1C", label: "Vencida"          },
};

export default function CartillaVacunacionModal({ mascotaNombre, onClose }: CartillaVacunacionModalProps) {

  const handleDescargar = () => {
    const lineas = [
      `CARTILLA DE VACUNACIÓN - ${mascotaNombre.toUpperCase()}`,
      `Fecha de emisión: ${new Date().toLocaleDateString("es-MX")}`,
      "",
      "VACUNAS APLICADAS",
      "─".repeat(60),
    ];
    mockVacunas.forEach((v) => {
      lineas.push(`• ${v.nombre}`);
      lineas.push(`  Aplicada: ${v.fechaAplicacion}  |  Próxima dosis: ${v.proximaDosis}`);
      lineas.push(`  Estado: ${ESTADO_STYLES[v.estado].label}`);
      lineas.push("");
    });
    const blob = new Blob([lineas.join("\n")], { type: "text/plain;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `cartilla_${mascotaNombre.toLowerCase().replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px" }}>
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", width: "100%", maxWidth: "560px", maxHeight: "88vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>

        <div style={{ padding: "24px 28px", borderBottom: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1F2937", margin: 0 }}>Cartilla de vacunación</h2>
            <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0 0" }}>{mascotaNombre}</p>
          </div>
          <button onClick={onClose} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "none", backgroundColor: "#F3F4F6", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B7280" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <div style={{ overflowY: "auto", padding: "24px 28px", flex: 1 }}>
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
            {Object.entries(ESTADO_STYLES).map(([key, s]) => (
              <span key={key} style={{ padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, backgroundColor: s.bg, color: s.color }}>
                {s.label}
              </span>
            ))}
          </div>

          <div style={{ border: "1px solid #E5E7EB", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", padding: "10px 16px", backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              {["Vacuna", "Aplicada", "Próxima dosis", "Estado"].map((h) => (
                <span key={h} style={{ fontSize: "11px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>
              ))}
            </div>
            {mockVacunas.map((v, i) => {
              const s = ESTADO_STYLES[v.estado];
              return (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", padding: "14px 16px", borderBottom: i < mockVacunas.length - 1 ? "1px solid #F3F4F6" : "none", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>{v.nombre}</span>
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>{v.fechaAplicacion}</span>
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>{v.proximaDosis}</span>
                  <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, backgroundColor: s.bg, color: s.color, whiteSpace: "nowrap" }}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ padding: "16px 28px", borderTop: "1px solid #E5E7EB", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button onClick={onClose}
            style={{ padding: "10px 20px", borderRadius: "10px", border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF", fontSize: "14px", color: "#6B7280", cursor: "pointer", fontWeight: 500 }}>
            Cerrar
          </button>
          <button onClick={handleDescargar}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 22px", borderRadius: "10px", border: "none", backgroundColor: "#4F8A7C", color: "#FFFFFF", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#3E6F63"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4F8A7C"; }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Descargar cartilla
          </button>
        </div>
      </div>
    </div>
  );
}