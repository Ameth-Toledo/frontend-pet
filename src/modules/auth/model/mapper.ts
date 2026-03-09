import { LoginResponseDTO } from '@/modules/auth/model/dto/response/LoginResponseDTO';
import { User } from '@/modules/auth/model/entities/User';
import { UserRoleId, UserRoleName, ROLE_MAP } from '@/modules/auth/model/entities/UserRole';
import { UserUIModel, UserRole } from '@/modules/auth/model/ui.model';

export class AuthMapper {

  static toEntity(dto: LoginResponseDTO['user']): User {
    const rolId = dto.rol as unknown as UserRoleId;
    const rol: UserRoleName = ROLE_MAP[rolId] ?? dto.rol as UserRoleName;

    return {
      id: dto.id,
      nombre: dto.nombre,
      apellido: dto.apellido,
      email: dto.email,
      rolId,
      rol,
      passwordTemporal: dto.password_temporal,
      fotoPerfil: dto.foto_perfil,
    };
  }

  static toUIModel(user: User): UserUIModel {
    return {
      id: user.id,
      fullName: `${user.nombre} ${user.apellido}`,
      email: user.email,
      role: user.rol as UserRole,
      isStaff: user.rol === 'ADMIN' || user.rol === 'VETERINARIO',
    };
  }
}