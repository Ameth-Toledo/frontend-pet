import React from "react";
import { MascotaDetalleHeaderProps } from "../model/dto/props/MascotaDetalleHeaderProps";

function PawIllustration() {
  return (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <ellipse cx="32" cy="42" rx="14" ry="11" fill="#4F8A7C" opacity="0.15" />
      <ellipse cx="32" cy="42" rx="14" ry="11" stroke="#4F8A7C" strokeWidth="2" fill="none" />
      <circle cx="16" cy="28" r="5" fill="#4F8A7C" opacity="0.15" stroke="#4F8A7C" strokeWidth="2" />
      <circle cx="48" cy="28" r="5" fill="#4F8A7C" opacity="0.15" stroke="#4F8A7C" strokeWidth="2" />
      <circle cx="24" cy="20" r="5" fill="#4F8A7C" opacity="0.15" stroke="#4F8A7C" strokeWidth="2" />
      <circle cx="40" cy="20" r="5" fill="#4F8A7C" opacity="0.15" stroke="#4F8A7C" strokeWidth="2" />
    </svg>
  );
}

export default function MascotaDetalleHeader({ mascota }: MascotaDetalleHeaderProps) {
  return (
    <div className="bg-[#F0F5F4] rounded-2xl px-6 py-5 flex items-center gap-5 mb-6">
      <div className="w-16 h-16 rounded-2xl bg-white border border-[#D4E6E2] flex items-center justify-center flex-shrink-0 shadow-sm">
        <PawIllustration />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 leading-tight">{mascota.nombre}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{mascota.raza}</p>
      </div>
    </div>
  );
}