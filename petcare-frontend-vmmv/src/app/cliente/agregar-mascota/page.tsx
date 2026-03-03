"use client";

import { useRouter } from "next/navigation";

export default function AgregarMascotaPage() {
  const router = useRouter();

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">
        ¿Quién es el paciente?
      </h1>

      {/* Aquí luego metemos el componente real del diseño */}

      <button
        onClick={() => router.back()}
        className="mt-6 text-sm text-emerald-600"
      >
        ← Volver
      </button>
    </div>
  );
}