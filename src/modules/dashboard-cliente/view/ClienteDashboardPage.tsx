"use client";

import React from "react";
import { useClienteDashboardViewModel } from "../viewmodel/useClienteDashboardViewModel";
import DashboardHeader from "./DashboardHeader";
import PetCard from "./PetCard";
import AppointmentCard from "./AppointmentCard";
import AgregarMascotaModal from "./AgregarMascotaModal";

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <div style={{ width: "40px", height: "40px", border: "4px solid #E5E7EB", borderTop: "4px solid #5BAA9C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function ClienteDashboardPage() {
  const { data, loading, error, showModal, setShowModal, handleAgregarMascota } =
    useClienteDashboardViewModel();

  if (loading) return <Spinner />;

  if (error) return (
    <div style={{ padding: "32px" }}>
      <p style={{ color: "#EF4444", fontSize: "14px" }}>Error: {error}</p>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#F7F9F8", minHeight: "100vh", padding: "32px" }}>
      <DashboardHeader />

      {/* Mascotas */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1F2937", marginBottom: "16px" }}>Mis mascotas</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {data?.mascotas.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </section>

      {/* Próximas citas */}
      <section>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1F2937", marginBottom: "16px" }}>Próximas citas</h2>
        <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "8px 24px" }}>
          {data?.proximasCitas.map((apt, i) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              isLast={i === (data.proximasCitas.length - 1)}
            />
          ))}
        </div>
      </section>

      {showModal && (
        <AgregarMascotaModal
          onClose={() => setShowModal(false)}
          onGuardar={handleAgregarMascota}
        />
      )}
    </div>
  );
}
