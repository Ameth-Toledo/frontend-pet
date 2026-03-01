"use client";

export default function MisCitasVeterinario() {
  const citas = [
    {
      paciente: "Buddy",
      raza: "Golden Retriever",
      propietario: "Sarah Jenkins",
      servicio: "Chequeo médico",
      fecha: "12 Oct, 2023",
      hora: "10:30 AM",
      estado: "confirmada",
    },
    {
      paciente: "Bini",
      raza: "Border Terrier",
      propietario: "Linda Garcia",
      servicio: "Limpieza dental",
      fecha: "13 Oct, 2023",
      hora: "09:00 AM",
      estado: "confirmada",
    },
    {
      paciente: "Toro",
      raza: "Pug",
      propietario: "James Wilson",
      servicio: "Control de peso",
      fecha: "13 Oct, 2023",
      hora: "03:30 PM",
      estado: "cancelada",
    },
  ];

  const badgeStyles: Record<string, string> = {
    confirmada: "bg-green-100 text-green-700",
    cancelada: "bg-red-100 text-red-600",
    pendiente: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[#1E293B]">
            Mis citas
          </h1>
          <p className="text-sm text-gray-500">
            Gestión y seguimiento de tu agenda veterinaria.
          </p>
        </div>

        <div className="flex gap-4">
          <input
            placeholder="Buscar cita..."
            className="h-10 px-4 rounded-lg border border-gray-200 text-sm"
          />

          <select className="h-10 px-4 rounded-lg border border-gray-200 text-sm">
            <option>Todos</option>
            <option>Confirmadas</option>
            <option>Pendientes</option>
            <option>Canceladas</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        <div className="grid grid-cols-6 bg-gray-50 text-xs font-medium text-gray-500 px-6 py-4">
          <div>Paciente</div>
          <div>Propietario</div>
          <div>Servicio</div>
          <div>Fecha</div>
          <div>Estado</div>
          <div className="text-right">Acción</div>
        </div>

        <div className="divide-y">

          {citas.map((cita, index) => (
            <div
              key={index}
              className="grid grid-cols-6 items-center px-6 py-5 text-sm hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-medium text-[#1E293B]">
                  {cita.paciente}
                </p>
                <p className="text-xs text-gray-500">
                  {cita.raza}
                </p>
              </div>

              <div className="text-gray-600">
                {cita.propietario}
              </div>

              <div className="text-gray-600">
                {cita.servicio}
              </div>

              <div>
                <p className="text-[#1E293B]">
                  {cita.fecha}
                </p>
                <p className="text-xs text-gray-500">
                  {cita.hora}
                </p>
              </div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    badgeStyles[cita.estado]
                  }`}
                >
                  {cita.estado}
                </span>
              </div>

              <div className="text-right">
                {cita.estado === "confirmada" && (
                  <button className="bg-[#2F8F83] text-white px-4 py-2 rounded-lg text-xs">
                    Iniciar
                  </button>
                )}
              </div>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}