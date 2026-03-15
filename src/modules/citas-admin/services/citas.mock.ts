import { CitaAdminResponseDTO } from "../model/dto/response/CitaAdminResponseDTO";

export const mockCitas: CitaAdminResponseDTO[] = [
  { id: "CIT-001", paciente: "Buddy",  raza: "Golden Retriever", species: "dog", propietario: "Sarah Jenkins", servicio: "CHEQUEO_MEDICO",  fecha: "28 Feb 2026", hora: "09:30 AM", estado: "CONFIRMADA" },
  { id: "CIT-002", paciente: "Bella",  raza: "Border Terrier",   species: "dog", propietario: "James Wilson",  servicio: "LIMPIEZA_DENTAL", fecha: "28 Feb 2026", hora: "11:00 AM", estado: "CONFIRMADA" },
  { id: "CIT-003", paciente: "Max",    raza: "Pug",              species: "dog", propietario: "Linda Garcia",  servicio: "CONTROL_PESO",    fecha: "28 Feb 2026", hora: "12:30 PM", estado: "CANCELADA"  },
  { id: "CIT-004", paciente: "Luna",   raza: "Siamese Cat",      species: "cat", propietario: "Mark Thompson", servicio: "VACUNACION",      fecha: "01 Mar 2026", hora: "10:00 AM", estado: "CONFIRMADA" },
  { id: "CIT-005", paciente: "Rocky",  raza: "Labrador",         species: "dog", propietario: "Emma Davis",    servicio: "CHEQUEO_MEDICO",  fecha: "01 Mar 2026", hora: "03:15 PM", estado: "CANCELADA"  },
];