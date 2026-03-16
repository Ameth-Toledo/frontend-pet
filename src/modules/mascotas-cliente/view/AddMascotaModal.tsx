'use client';

import { useState } from 'react';
import { CreateMascotaRequestDTO } from '../model/dto/request/CreateMascotaRequestDTO';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<CreateMascotaRequestDTO, 'id_user'>) => Promise<{ success: boolean }>;
  isLoading: boolean;
}

const inputClass =
  'w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2F8F83] focus:border-transparent transition-all text-sm';

const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

export default function AddMascotaModal({ isOpen, onClose, onSubmit, isLoading }: Props) {
  const [form, setForm] = useState({
    nombre:           '',
    especie:          'Perro' as 'Perro' | 'Gato',
    fecha_nacimiento: '',
    sexo:             'Macho' as 'Macho' | 'Hembra',
    peso:             '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.fecha_nacimiento || !form.peso) return;
    const result = await onSubmit({ ...form, peso: parseFloat(form.peso) });
    if (result.success) {
      setForm({ nombre: '', especie: 'Perro', fecha_nacimiento: '', sexo: 'Macho', peso: '' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5">

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Agregar mascota</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div>
          <label className={labelClass}>Nombre</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Max"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Especie</label>
            <select name="especie" value={form.especie} onChange={handleChange} className={inputClass}>
              <option value="Perro">🐶 Perro</option>
              <option value="Gato">🐱 Gato</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Sexo</label>
            <select name="sexo" value={form.sexo} onChange={handleChange} className={inputClass}>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Fecha de nacimiento</label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={form.fecha_nacimiento}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Peso (kg)</label>
            <input
              type="number"
              name="peso"
              value={form.peso}
              onChange={handleChange}
              placeholder="Ej: 12.5"
              step="0.1"
              min="0"
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !form.nombre || !form.fecha_nacimiento || !form.peso}
            className="flex-1 py-2.5 bg-[#2F8F83] hover:bg-[#287A70] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Guardando...' : 'Guardar mascota'}
          </button>
        </div>
      </div>
    </div>
  );
}