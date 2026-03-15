import { MascotaDetalleResponseDTO } from "../model/dto/response/MascotaDetalleResponseDTO";
import { HistorialResponseDTO } from "../model/dto/response/HistorialResponseDTO";
import { VacunaResponseDTO } from "../model/dto/response/VacunaResponseDTO";

export const mockMascotas: Record<string, MascotaDetalleResponseDTO> = {
  "1": { id: "1", nombre: "Fierrolais", especie: "Perro", raza: "Golden Retriever", edad: 4, propietario: "Juan Pérez" },
  "2": { id: "2", nombre: "Luna",       especie: "Gato",  raza: "Siamés",           edad: 2, propietario: "Juan Pérez" },
};

export const mockHistorial: Record<string, HistorialResponseDTO[]> = {
  "1": [
    { id: "h1", fecha: "2023-12-15", motivo: "Chequeo General Preventivo",    observaciones: "Se realiza examen físico completo. El paciente presenta excelente condición corporal (3/5). Se observa dentadura limpia y encías sanas.", veterinario: "Dr. Alejandro Ruiz"    },
    { id: "h2", fecha: "2023-10-22", motivo: "Tratamiento Dermatológico",     observaciones: "Consulta por prurito intenso en zona abdominal y patas. Se diagnostica dermatitis alérgica estacional.",                                   veterinario: "Dra. Elena Martínez"  },
    { id: "h3", fecha: "2023-08-12", motivo: "Desparasitación Interna y Externa", observaciones: "Aplicación de refuerzo anual contra parásitos. Sin reacciones adversas inmediatas.",                                                   veterinario: "Dr. Alejandro Ruiz"    },
  ],
  "2": [
    { id: "h4", fecha: "2023-11-05", motivo: "Revisión General", observaciones: "Control rutinario. Todo en orden.", veterinario: "Dra. Elena Martínez" },
  ],
};

export const mockVacunas: Record<string, VacunaResponseDTO[]> = {
  "1": [
    { id: "v1", nombre: "Antirrábica",                 fechaAplicacion: "2024-01-15" },
    { id: "v2", nombre: "Séxtuple Canina (DHPPI+L)",   fechaAplicacion: "2023-12-12" },
    { id: "v3", nombre: "Bordetella",                  fechaAplicacion: "2023-10-10" },
    { id: "v4", nombre: "Giardia",                     fechaAplicacion: "2023-08-15" },
    { id: "v5", nombre: "Refuerzo Anual Polivalente",  fechaAplicacion: "2023-06-20" },
  ],
  "2": [
    { id: "v6", nombre: "Triple Felina", fechaAplicacion: "2023-09-01" },
    { id: "v7", nombre: "Rabia",         fechaAplicacion: "2023-09-01" },
  ],
};