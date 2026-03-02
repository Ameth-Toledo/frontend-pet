import { LoginResponseDTO } from './dto';
import { UserUIModel, UserRole } from './ui.model';

export class AuthMapper {
  static toUserUIModel(dto: LoginResponseDTO['user']): UserUIModel {
    // El backend envía directamente el rol: 'ADMIN', 'VETERINARIO', o 'CLIENTE'
    const role = dto.rol as UserRole;
    
    return {
      id: dto.id,
      fullName: `${dto.nombre} ${dto.apellido}`,
      email: dto.email,
      role: role,
      isStaff: role === 'ADMIN' || role === 'VETERINARIO',
    };
  }
}