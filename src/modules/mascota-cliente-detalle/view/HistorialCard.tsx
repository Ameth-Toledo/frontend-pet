import React from "react";
import { HistorialCardProps } from "../model/dto/props/HistorialCardProps";

function DoctorIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function HistorialCard({ historial }: HistorialCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm">
      <p className="text-[11px] font-semibold text-gray-400 tracking-wide uppercase mb-1">{historial.fechaFormateada}</p>
      <h3 className="text-base font-bold text-gray-800 mb-3">{historial.motivo}</h3>
      <p className="text-[10px] font-bold text-[#4F8A7C] uppercase tracking-widest mb-1">Observaciones</p>
      <p className="text-sm text-gray-500 leading-relaxed mb-4">{historial.observaciones}</p>
      <div className="flex items-center gap-1.5 text-gray-400">
        <DoctorIcon />
        <span className="text-xs text-gray-400">{historial.veterinario}</span>
      </div>
    </div>
  );
}