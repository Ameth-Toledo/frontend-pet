import React from "react";
import { EstadoCitaUI } from "../model/ui.model";

interface EstadoBadgeProps {
  estado: EstadoCitaUI;
}

const BADGE_STYLES: Record<EstadoCitaUI, { bg: string; color: string; label: string }> = {
  CONFIRMADA: {
    bg:    "#E6F2EF",
    color: "#2F7A6A",
    label: "CONFIRMADA",
  },
  CANCELADA: {
    bg:    "#FFF4E6",
    color: "#B45309",
    label: "CANCELADA",
  },
  COMPLETADA: {
    bg:    "#F3F4F6",
    color: "#6B7280",
    label: "COMPLETADA",
  },
};

export default function EstadoBadge({ estado }: EstadoBadgeProps) {
  const { bg, color, label } = BADGE_STYLES[estado];
  return (
    <span
      style={{
        display: "inline-block",
        backgroundColor: bg,
        color,
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.06em",
        padding: "3px 10px",
        borderRadius: "20px",
      }}
    >
      {label}
    </span>
  );
}