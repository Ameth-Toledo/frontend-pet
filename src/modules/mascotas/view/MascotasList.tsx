import React from "react";
import { MascotasListProps } from "../model/dto/props/MascotasListProps";
import MascotaCard from "./MascotaCard";

export default function MascotasList({ mascotas, total, onVerMascota, onEditarMascota }: MascotasListProps) {
  return (
    <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1.5fr 1fr 80px", backgroundColor: "#F9FAFB", padding: "12px 24px", fontSize: "11px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        <div>Mascota</div><div>Especie / Raza</div><div>Propietario</div><div>Estado</div>
        <div style={{ textAlign: "right" }}>Acciones</div>
      </div>

      {mascotas.map((m) => (
        <MascotaCard key={m.id} mascota={m} onVer={() => onVerMascota(m)} onEditar={() => onEditarMascota(m)} />
      ))}

      <div style={{ padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "#6B7280", borderTop: "1px solid #F3F4F6" }}>
        <span>Mostrando {mascotas.length} de {total} pacientes</span>
        <div style={{ display: "flex", gap: "6px" }}>
          {[1, 2, 3].map((n) => (
            <button key={n} style={{ width: "30px", height: "30px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", border: n === 1 ? "none" : "1px solid #E5E7EB", backgroundColor: n === 1 ? "#4F8A7C" : "#FFFFFF", color: n === 1 ? "#FFFFFF" : "#6B7280" }}>
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}