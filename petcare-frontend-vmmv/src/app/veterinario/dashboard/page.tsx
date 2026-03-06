"use client";

export default function VeterinarioDashboard() {
  return (
    <div style={{ padding: "32px", backgroundColor: "#F7F9FB", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#1F2937", margin: 0 }}>
          Panel principal
        </h1>
        <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0 0" }}>
          Resumen de tu actividad veterinaria del día.
        </p>
      </div>

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Citas hoy", value: "12", sub: "+15% respecto a ayer", subColor: "#4F8A7C" },
          { label: "Próxima cita", value: "09:30 AM - Buddy", sub: "Chequeo médico", subColor: "#4F8A7C" },
          { label: "Pacientes activos", value: "48", sub: "8 nuevos esta semana", subColor: "#6B7280" },
        ].map((stat, i) => (
          <div key={i} style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "16px",
            padding: "20px 24px",
          }}>
            <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>{stat.label}</p>
            <h2 style={{ fontSize: i === 1 ? "16px" : "28px", fontWeight: 700, color: "#1F2937", margin: "8px 0 4px" }}>
              {stat.value}
            </h2>
            <p style={{ fontSize: "12px", color: stat.subColor, margin: 0 }}>{stat.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>

        {/* PRÓXIMAS CITAS */}
        <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1F2937", margin: 0 }}>Próximas citas</h3>
            <button style={{ fontSize: "13px", color: "#4F8A7C", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}>
              Ver todas
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { nombre: "Buddy", hora: "09:30 AM", servicio: "Chequeo médico" },
              { nombre: "Luna",  hora: "11:15 AM", servicio: "Control post cirugía" },
            ].map((cita, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                border: "1px solid #E5E7EB", borderRadius: "10px", padding: "14px 16px",
              }}>
                <div>
                  <p style={{ fontWeight: 600, color: "#1F2937", margin: 0, fontSize: "14px" }}>{cita.nombre}</p>
                  <p style={{ fontSize: "12px", color: "#6B7280", margin: "2px 0 0 0" }}>{cita.hora} • {cita.servicio}</p>
                </div>
                <button style={{
                  backgroundColor: "#4F8A7C", color: "#FFFFFF",
                  border: "none", borderRadius: "8px", padding: "8px 16px",
                  fontSize: "13px", fontWeight: 500, cursor: "pointer",
                }}>
                  Iniciar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PACIENTES RECIENTES */}
        <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "24px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1F2937", margin: "0 0 20px 0" }}>Pacientes recientes</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { nombre: "Maximus", raza: "Golden Retriever" },
              { nombre: "Misty",   raza: "Siamés" },
              { nombre: "Bella",   raza: "Pastor Alemán" },
            ].map((p, i) => (
              <div key={i} style={{ borderBottom: i < 2 ? "1px solid #F3F4F6" : "none", paddingBottom: i < 2 ? "16px" : 0 }}>
                <p style={{ fontWeight: 600, color: "#1F2937", margin: 0, fontSize: "14px" }}>{p.nombre}</p>
                <p style={{ fontSize: "12px", color: "#6B7280", margin: "2px 0 0 0" }}>{p.raza}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
