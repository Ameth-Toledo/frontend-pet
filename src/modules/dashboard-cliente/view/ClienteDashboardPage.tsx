"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PetCard from "./PetCard";
import AppointmentCard from "./AppointmentCard";
import AgregarMascotaModal from "./AgregarMascotaModal";
import AgendarCitaModal from "./AgendarCitaModal";
import { PetUI, AppointmentUI } from "../model/ui.model";

const C = {
  green: "#5BAA9C", greenLight: "#E6F4F1", bg: "#F7F9F8",
  textMain: "#1F2937", textSub: "#6B7280", border: "#E5E7EB", white: "#FFFFFF",
};

const mockMascotas: PetUI[] = [
  { id: "1", nombre: "Firulais", tipo: "perro", raza: "Golden Retriever" },
  { id: "2", nombre: "Luna",     tipo: "gato",  raza: "Siamés" },
];

const mockCitas: AppointmentUI[] = [
  { id: "1", titulo: "Consulta General", doctor: "Dr. Ricardo Méndez", mes: "NOV", dia: 24, hora: "10:30 AM", tipo: "consulta" },
  { id: "2", titulo: "Vacunación Anual", doctor: "Dra. Elena Soler",   mes: "DIC", dia: 2,  hora: "04:00 PM", tipo: "vacuna"   },
];

export default function ClienteDashboardPage() {
  const router = useRouter();
  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const [showAgendarModal, setShowAgendarModal] = useState(false);

  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh", padding: "32px" }}>

      <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
        <button
          onClick={() => setShowAgendarModal(true)}
          style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: C.green, color: C.white, border: "none", borderRadius: "24px", padding: "10px 22px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          Agendar cita
        </button>
        <button
          onClick={() => setShowAgregarModal(true)}
          style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: C.white, color: C.green, border: `1.5px solid ${C.green}`, borderRadius: "24px", padding: "10px 22px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Agregar mascota
        </button>
      </div>

      <div style={{ display: "flex", gap: "28px", alignItems: "flex-start" }}>

        <div style={{ flex: "1 1 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: C.textMain, margin: 0 }}>Mis Mascotas</h2>
            <button onClick={() => router.push("/cliente/mismascotas")}
              style={{ background: "none", border: "none", fontSize: "13px", color: C.green, cursor: "pointer", fontWeight: 500 }}>
              Ver todas
            </button>
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {mockMascotas.map((pet) => (
              <PetCard key={pet.id} pet={pet} onVerMascota={() => router.push(`/cliente/mismascotas/${pet.id}`)} />
            ))}
          </div>
        </div>

        <div style={{ width: "300px", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: C.textMain, margin: 0 }}>Próximas Citas</h2>
          </div>
          <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: "20px", padding: "8px 20px 4px", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
            {mockCitas.map((cita, i) => (
              <AppointmentCard key={cita.id} appointment={cita} isLast={i === mockCitas.length - 1} />
            ))}
            <div style={{ borderTop: `1px solid ${C.border}`, padding: "14px 0 10px", textAlign: "center" }}>
              <p style={{ fontSize: "12px", color: C.textSub, marginBottom: "6px" }}>¿Necesitas una nueva cita?</p>
              <button onClick={() => setShowAgendarModal(true)}
                style={{ background: "none", border: "none", fontSize: "13px", color: C.green, fontWeight: 600, cursor: "pointer" }}>
                + Agendar cita nueva
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAgregarModal && (
        <AgregarMascotaModal
          onClose={() => setShowAgregarModal(false)}
          onGuardar={(nombre, especie, raza) => {
            setShowAgregarModal(false);
          }}
        />
      )}

      {showAgendarModal && (
        <AgendarCitaModal
          onClose={() => setShowAgendarModal(false)}
          onAgendar={(mascotaId, fecha, hora, motivo) => {
            setShowAgendarModal(false);
          }}
        />
      )}
    </div>
  );
}