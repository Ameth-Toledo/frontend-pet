"use client";

export default function MisCitasVeterinario() {
  const citas = [
    { paciente: "Buddy",  raza: "Golden Retriever", propietario: "Sarah Jenkins", servicio: "Chequeo médico",   fecha: "12 Oct, 2023", hora: "10:30 AM", estado: "confirmada" },
    { paciente: "Bini",   raza: "Border Terrier",   propietario: "Linda Garcia",  servicio: "Limpieza dental",  fecha: "13 Oct, 2023", hora: "09:00 AM", estado: "confirmada" },
    { paciente: "Toro",   raza: "Pug",              propietario: "James Wilson",  servicio: "Control de peso",  fecha: "13 Oct, 2023", hora: "03:30 PM", estado: "cancelada" },
  ];

  const badgeStyle: Record<string, React.CSSProperties> = {
    confirmada: { backgroundColor: "#E6F4F1", color: "#2F6B62" },
    cancelada:  { backgroundColor: "#FEF2F2", color: "#B91C1C" },
    pendiente:  { backgroundColor: "#FFFBEB", color: "#92400E" },
  };

  return (
    <div style={{ padding: "32px", backgroundColor: "#F7F9FB", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#1F2937", margin: 0 }}>Mis citas</h1>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0 0" }}>
            Gestión y seguimiento de tu agenda veterinaria.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            placeholder="Buscar cita..."
            style={{ height: "38px", padding: "0 14px", borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none" }}
          />
          <select style={{ height: "38px", padding: "0 14px", borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", backgroundColor: "#FFFFFF" }}>
            <option>Todos</option>
            <option>Confirmadas</option>
            <option>Pendientes</option>
            <option>Canceladas</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 100px", backgroundColor: "#F9FAFB", padding: "12px 24px", fontSize: "11px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          <div>Paciente</div>
          <div>Propietario</div>
          <div>Servicio</div>
          <div>Fecha</div>
          <div>Estado</div>
          <div style={{ textAlign: "right" }}>Acción</div>
        </div>

        {citas.map((cita, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 100px",
            alignItems: "center", padding: "16px 24px", fontSize: "13px",
            borderTop: "1px solid #F3F4F6",
          }}>
            <div>
              <p style={{ fontWeight: 600, color: "#1F2937", margin: 0 }}>{cita.paciente}</p>
              <p style={{ fontSize: "11px", color: "#6B7280", margin: "2px 0 0 0" }}>{cita.raza}</p>
            </div>
            <div style={{ color: "#6B7280" }}>{cita.propietario}</div>
            <div style={{ color: "#6B7280" }}>{cita.servicio}</div>
            <div>
              <p style={{ color: "#1F2937", margin: 0 }}>{cita.fecha}</p>
              <p style={{ fontSize: "11px", color: "#6B7280", margin: "2px 0 0 0" }}>{cita.hora}</p>
            </div>
            <div>
              <span style={{ ...badgeStyle[cita.estado], padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600 }}>
                {cita.estado}
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              {cita.estado === "confirmada" && (
                <button style={{ backgroundColor: "#4F8A7C", color: "#FFFFFF", border: "none", borderRadius: "8px", padding: "7px 14px", fontSize: "12px", fontWeight: 500, cursor: "pointer" }}>
                  Iniciar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
