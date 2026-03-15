import React from "react";
import { AddMascotaCardProps } from "../model/dto/props/AddMascotaCardProps";

const C = { green: "#4F8A7C", greenLight: "#E6F2EF", border: "#C8DDD9" };

export default function AddMascotaCard({ onClick }: AddMascotaCardProps) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ border: `2px dashed ${C.border}`, borderRadius: "20px", padding: "28px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", cursor: "pointer", backgroundColor: hovered ? C.greenLight : "transparent", transition: "background-color 0.15s", minHeight: "200px" }}>
      <div style={{ width: "42px", height: "42px", borderRadius: "50%", border: `2px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: hovered ? C.greenLight : "#fff" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </div>
      <p style={{ fontSize: "13px", color: C.green, fontWeight: 500 }}>Agregar nueva mascota</p>
    </div>
  );
}