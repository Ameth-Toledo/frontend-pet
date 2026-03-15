import { ClienteResponseDTO } from "../model/dto/response/ClienteResponseDTO";

export const mockClientes: ClienteResponseDTO[] = [
  { id: "CLI-001", nombre: "Sarah Jenkins",  telefono: "+1 (555) 234-5678", email: "sarah.jenkins@email.com",  mascotas: ["Buddy", "Max"],          estado: "ACTIVO"   },
  { id: "CLI-002", nombre: "Mark Thompson",  telefono: "+1 (555) 876-5432", email: "mark.thompson@email.com",  mascotas: ["Luna"],                   estado: "ACTIVO"   },
  { id: "CLI-003", nombre: "Linda Garcia",   telefono: "+1 (555) 345-6789", email: "linda.garcia@email.com",   mascotas: ["Coco", "Bella", "Rocky"], estado: "INACTIVO" },
  { id: "CLI-004", nombre: "James Wilson",   telefono: "+1 (555) 654-3210", email: "james.wilson@email.com",   mascotas: ["Charlie"],                estado: "ACTIVO"   },
  { id: "CLI-005", nombre: "Emma Davis",     telefono: "+1 (555) 111-2233", email: "emma.davis@email.com",     mascotas: ["Mia", "Leo"],             estado: "ACTIVO"   },
  { id: "CLI-006", nombre: "Carlos Méndez",  telefono: "+1 (555) 998-7766", email: "carlos.mendez@email.com",  mascotas: ["Thor"],                   estado: "INACTIVO" },
];