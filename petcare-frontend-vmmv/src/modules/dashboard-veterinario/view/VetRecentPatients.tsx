import React from "react";
import { VetPatientUI } from "../model/ui.model";

interface Props {
  patients: VetPatientUI[];
}

export default function VetRecentPatients({ patients }: Props) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        padding: "24px",
        width: "280px",
        flexShrink: 0,
      }}
    >
      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1F2937", margin: "0 0 20px 0" }}>
        Pacientes recientes
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {patients.map((p, i) => (
          <div
            key={p.id}
            style={{
              borderBottom: i < patients.length - 1 ? "1px solid #F3F4F6" : "none",
              paddingBottom: i < patients.length - 1 ? "16px" : 0,
            }}
          >
            <p style={{ fontWeight: 600, color: "#1F2937", margin: 0, fontSize: "14px" }}>
              {p.name}
            </p>
            <p style={{ fontSize: "12px", color: "#6B7280", margin: "2px 0 0 0" }}>
              {p.breed}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
