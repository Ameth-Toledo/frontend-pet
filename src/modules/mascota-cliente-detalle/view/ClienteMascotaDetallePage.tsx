"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useClienteMascotaDetalleViewModel } from "../viewmodel/useClienteMascotaDetalleViewModel";
import { ClienteMascotaDetallePageProps } from "../model/dto/props/ClienteMascotaDetallePageProps";
import MascotaDetalleHeader from "./MascotaDetalleHeader";
import MascotaTabs from "./MascotaTabs";
import HistorialTab from "./HistorialTab";
import CartillaVacunacionTab from "./CartillaVacunacionTab";

function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#F7F9FB]">
      <div className="w-9 h-9 border-4 border-gray-200 border-t-[#4F8A7C] rounded-full animate-spin" />
    </div>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ClienteMascotaDetallePage({ mascotaId }: ClienteMascotaDetallePageProps) {
  const router = useRouter();
  const { mascota, historial, vacunas, isLoading, isLoadingVacunas, error, tabActivo, setTabActivo } =
    useClienteMascotaDetalleViewModel(mascotaId);

  if (isLoading) return <Spinner />;

  return (
    <div style={{ padding: "32px", backgroundColor: "#F7F9FB", minHeight: "100vh" }}>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeftIcon />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Perfil de Mascota</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Mis mascotas <span className="text-[#4F8A7C] font-medium">/ {mascota?.nombre ?? ""}</span>
          </p>
        </div>
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <div style={{ maxWidth: "860px" }}>
        {mascota && <MascotaDetalleHeader mascota={mascota} />}
        <MascotaTabs tabActivo={tabActivo} onTabChange={setTabActivo} />
        {tabActivo === "historial" && <HistorialTab historial={historial} />}
        {tabActivo === "vacunas"   && <CartillaVacunacionTab vacunas={vacunas} isLoadingVacunas={isLoadingVacunas} />}
      </div>
    </div>
  );
}