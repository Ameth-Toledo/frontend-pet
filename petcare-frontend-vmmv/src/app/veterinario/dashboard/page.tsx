"use client";

export default function VeterinarioDashboard() {
  return (
    <div className="grid grid-cols-12 gap-8">

      {/* LEFT COLUMN */}
      <div className="col-span-9 space-y-8">

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Citas hoy</p>
            <h2 className="text-3xl font-semibold text-[#1E293B] mt-2">12</h2>
            <p className="text-xs text-green-600 mt-1">
              +15% respecto a ayer
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Próxima cita</p>
            <h2 className="text-lg font-semibold text-[#1E293B] mt-2">
              09:30 AM - Buddy
            </h2>
            <p className="text-xs text-[#2F8F83] mt-1">
              Chequeo médico
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Pacientes activos</p>
            <h2 className="text-3xl font-semibold text-[#1E293B] mt-2">48</h2>
            <p className="text-xs text-gray-400 mt-1">
              8 nuevos esta semana
            </p>
          </div>

        </div>

        {/* PROXIMAS CITAS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">
              Próximas citas
            </h3>
            <button className="text-sm text-[#2F8F83] font-medium">
              Ver todas
            </button>
          </div>

          <div className="space-y-4">

            <div className="flex items-center justify-between border rounded-xl p-4 hover:bg-gray-50 transition">
              <div>
                <p className="font-medium text-[#1E293B]">Buddy</p>
                <p className="text-sm text-gray-500">
                  09:30 AM • Chequeo médico
                </p>
              </div>

              <button className="bg-[#2F8F83] text-white px-4 py-2 rounded-lg text-sm">
                Iniciar
              </button>
            </div>

            <div className="flex items-center justify-between border rounded-xl p-4 hover:bg-gray-50 transition">
              <div>
                <p className="font-medium text-[#1E293B]">Luna</p>
                <p className="text-sm text-gray-500">
                  11:15 AM • Control post cirugía
                </p>
              </div>

              <button className="bg-[#2F8F83] text-white px-4 py-2 rounded-lg text-sm">
                Iniciar
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* RIGHT COLUMN */}
      <div className="col-span-3 space-y-8">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

          <h3 className="text-lg font-semibold text-[#1E293B] mb-6">
            Pacientes recientes
          </h3>

          <div className="space-y-4">

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#1E293B]">Maximus</p>
                <p className="text-xs text-gray-500">
                  Golden Retriever
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#1E293B]">Misty</p>
                <p className="text-xs text-gray-500">
                  Siamese
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#1E293B]">Bella</p>
                <p className="text-xs text-gray-500">
                  Pastor Alemán
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}