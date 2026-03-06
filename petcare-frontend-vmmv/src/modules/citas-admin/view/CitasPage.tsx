"use client";

import React from "react";
import { useCitasViewModel } from "@/modules/citas-admin/viewmodel/useCitasViewModel";
import CitasHeader from "./CitasHeader";
import CitasTable from "./CitasTable";

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ width: "36px", height: "36px", border: "4px solid #E5E7EB", borderTop: "4px solid #4F8A7C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function CitasPage() {
  const { filteredCitas, searchTerm, setSearchTerm, loading } = useCitasViewModel();

  if (loading) return <Spinner />;

  return (
    <div style={{ padding: "32px", minHeight: "100vh" }}>
      <CitasHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <CitasTable citas={filteredCitas} />
    </div>
  );
}
