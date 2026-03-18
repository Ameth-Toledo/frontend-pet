'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useClienteMascotasViewModel } from '../viewmodel/useClienteMascotasViewModel';
import MascotasHeader from './MascotasHeader';
import MascotaCard from './MascotaCard';
import AddMascotaCard from './AddMascotaCard';
import AddMascotaModal from './AddMascotaModal';
import MascotaEditModal from './MascotaEditModal';
import { MascotaUI } from '../model/ui.model';
import { CreateMascotaRequestDTO } from '../model/dto/request/CreateMascotaRequestDTO';

function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2F8F83] rounded-full animate-spin" />
    </div>
  );
}

export function ClienteMascotasPage() {
  const router = useRouter();
  const { mascotas, loading, creating, error, createMascota, refetch } = useClienteMascotasViewModel();

  const [selectedMascota, setSelectedMascota] = useState<MascotaUI | null>(null);
  const [showEdit,        setShowEdit]        = useState(false);
  const [showAgregar,     setShowAgregar]     = useState(false);

  if (loading) return <Spinner />;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <MascotasHeader />

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {mascotas.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
          <div className="w-16 h-16 bg-[#2F8F83]/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-[#2F8F83]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">Aún no tienes mascotas registradas</p>
          <button onClick={() => setShowAgregar(true)} className="text-[#2F8F83] text-sm font-medium hover:underline">
            Registrar mi primera mascota
          </button>
        </div>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
        {mascotas.map(mascota => (
          <MascotaCard
            key={mascota.id}
            mascota={mascota}
            onVer={(id) => router.push(`/cliente/mismascotas/${id}`)}
            onEditar={() => { setSelectedMascota(mascota); setShowEdit(true); }}
          />
        ))}
        <AddMascotaCard onClick={() => setShowAgregar(true)} />
      </div>

      {selectedMascota && showEdit && (
        <MascotaEditModal
          mascota={selectedMascota}
          onClose={() => { setSelectedMascota(null); setShowEdit(false); }}
          onGuardar={() => { setSelectedMascota(null); setShowEdit(false); refetch(); }}
        />
      )}

      <AddMascotaModal
        isOpen={showAgregar}
        onClose={() => setShowAgregar(false)}
        onSubmit={(form: Omit<CreateMascotaRequestDTO, 'id_user'>) => createMascota(form)}
        isLoading={creating}
      />
    </div>
  );
}