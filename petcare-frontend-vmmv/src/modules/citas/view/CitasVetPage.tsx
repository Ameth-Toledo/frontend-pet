"use client";

import React from "react";
import { useCitasVetViewModel } from "@/modules/citas/viewmodel/useCitasViewModel";
import CitasVetHeader from "./CitasVetHeader";
import CitasVetTable from "./CitasVetTable";

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ width: "36px", height: "36px", border: "4px solid #E5E7EB", borderTop: "4px solid #4F8A7C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function CitasVetPage() {
  const { filteredCitas, searchTerm, setSearchTerm, loading, userName } = useCitasVetViewModel();

  if (loading) return <Spinner />;

  return (
    <div style={{ padding: "32px", minHeight: "100vh" }}>
      <CitasVetHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} userName={userName} />
      <CitasVetTable citas={filteredCitas} />
    </div>
  );
}
