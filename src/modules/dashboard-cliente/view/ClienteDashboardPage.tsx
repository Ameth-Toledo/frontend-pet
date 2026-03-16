'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PetCard from './PetCard';
import AgendarCitaModal from './AgendarCitaModal';
import AddMascotaModal from '@/modules/mascotas-cliente/view/AddMascotaModal';
import { useClienteMascotasViewModel } from '@/modules/mascotas-cliente/viewmodel/useClienteMascotasViewModel';
import { useClienteDashboardViewModel } from '../viewmodel/useClienteDashboardViewModel';
import { CreateMascotaRequestDTO } from '@/modules/mascotas-cliente/model/dto/request/CreateMascotaRequestDTO';
import { GetCitaResponse } from '../model/dto/response/AppointmentResponseDTO';

const C = {
  green: '#5BAA9C', bg: '#F7F9F8',
  textMain: '#1F2937', textSub: '#6B7280',
  border: '#E5E7EB', white: '#FFFFFF',
};

const ESTADO_LABEL: Record<string, string> = {
  PENDIENTE:  'Pendiente',
  CONFIRMADA: 'Confirmada',
  CANCELADA:  'Cancelada',
  COMPLETADA: 'Completada',
};

const ESTADO_COLOR: Record<string, string> = {
  PENDIENTE:  '#F59E0B',
  CONFIRMADA: '#10B981',
  CANCELADA:  '#EF4444',
  COMPLETADA: '#6B7280',
};

function CitaCard({ cita }: { cita: GetCitaResponse }) {
  const fecha = new Date(cita.fecha);
  const mes   = fecha.toLocaleString('es-MX', { month: 'short' }).toUpperCase();
  const dia   = fecha.getDate();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 0', borderBottom: `1px solid ${C.border}` }}>
      <div style={{ textAlign: 'center', minWidth: '40px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, color: C.green }}>{mes}</div>
        <div style={{ fontSize: '22px', fontWeight: 800, color: C.textMain, lineHeight: 1 }}>{dia}</div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: C.textMain }}>
          Cita #{cita.id}
        </div>
        <div style={{ fontSize: '11px', color: C.textSub, marginTop: '2px' }}>
          {cita.observaciones_cliente || 'Sin observaciones'}
        </div>
      </div>
      <span style={{
        fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px',
        backgroundColor: `${ESTADO_COLOR[cita.estado]}20`,
        color: ESTADO_COLOR[cita.estado],
      }}>
        {ESTADO_LABEL[cita.estado] ?? cita.estado}
      </span>
    </div>
  );
}

export default function ClienteDashboardPage() {
  const router = useRouter();
  const { mascotas, creating, createMascota } = useClienteMascotasViewModel();
  const { citas, loading: loadingCitas }      = useClienteDashboardViewModel();

  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const [showAgendarModal, setShowAgendarModal] = useState(false);

  const citasActivas = citas.filter(c => c.estado !== 'CANCELADA' && c.estado !== 'COMPLETADA');

  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh', padding: '32px' }}>

      {/* Botones */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        <button onClick={() => setShowAgendarModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: C.green, color: C.white, border: 'none', borderRadius: '24px', padding: '10px 22px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          Agendar cita
        </button>
        <button onClick={() => setShowAgregarModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: C.white, color: C.green, border: `1.5px solid ${C.green}`, borderRadius: '24px', padding: '10px 22px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Agregar mascota
        </button>
      </div>

      <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>

        {/* Mascotas */}
        <div style={{ flex: '1 1 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: C.textMain, margin: 0 }}>Mis Mascotas</h2>
            <button onClick={() => router.push('/cliente/mismascotas')}
              style={{ background: 'none', border: 'none', fontSize: '13px', color: C.green, cursor: 'pointer', fontWeight: 500 }}>
              Ver todas
            </button>
          </div>
          {mascotas.length === 0 ? (
            <p style={{ fontSize: '13px', color: C.textSub }}>Aún no tienes mascotas registradas.</p>
          ) : (
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {mascotas.map(pet => (
                <PetCard
                  key={pet.id}
                  pet={{ id: String(pet.id), nombre: pet.nombre, tipo: pet.icon, raza: pet.especie }}
                  onVerMascota={() => router.push(`/cliente/mismascotas/${pet.id}`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Citas */}
        <div style={{ width: '300px', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: C.textMain, margin: 0 }}>Próximas Citas</h2>
          </div>
          <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '8px 20px 4px', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
            {loadingCitas ? (
              <p style={{ fontSize: '13px', color: C.textSub, padding: '16px 0', textAlign: 'center' }}>Cargando...</p>
            ) : citasActivas.length === 0 ? (
              <p style={{ fontSize: '13px', color: C.textSub, padding: '16px 0', textAlign: 'center' }}>Sin citas próximas.</p>
            ) : (
              citasActivas.slice(0, 3).map(cita => <CitaCard key={cita.id} cita={cita} />)
            )}
            <div style={{ padding: '14px 0 10px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: C.textSub, marginBottom: '6px' }}>¿Necesitas una nueva cita?</p>
              <button onClick={() => setShowAgendarModal(true)}
                style={{ background: 'none', border: 'none', fontSize: '13px', color: C.green, fontWeight: 600, cursor: 'pointer' }}>
                + Agendar cita nueva
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddMascotaModal
        isOpen={showAgregarModal}
        onClose={() => setShowAgregarModal(false)}
        onSubmit={(form: Omit<CreateMascotaRequestDTO, 'id_user'>) => createMascota(form)}
        isLoading={creating}
      />

      {showAgendarModal && (
        <AgendarCitaModal
          mascotas={mascotas}
          onClose={() => setShowAgendarModal(false)}
          onAgendarSuccess={() => {
            setShowAgendarModal(false);
          }}
        />
      )}
    </div>
  );
}