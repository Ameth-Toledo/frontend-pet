import { UserRoleId, UserRoleName } from './UserRole';

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rolId: UserRoleId;
  rol: UserRoleName;
  passwordTemporal: boolean;
  fotoPerfil: string | null;
}