import { MascotaDTO } from "./dto";
import { MascotaUI } from "./ui.model";

export function mapMascotaDTOtoUI(dto: MascotaDTO): MascotaUI {
  return {
    id: dto.id,
    nombre: dto.nombre,
    especie: dto.especie,
    raza: dto.raza,
    propietario: dto.propietario,
    estado: dto.estado,
  };
}
