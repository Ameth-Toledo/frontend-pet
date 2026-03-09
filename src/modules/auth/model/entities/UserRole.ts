export type UserRoleId = 1 | 2 | 3;

export type UserRoleName = 'ADMIN' | 'VETERINARIO' | 'CLIENTE';

export const ROLE_MAP: Record<UserRoleId, UserRoleName> = {
  1: 'ADMIN',
  2: 'VETERINARIO',
  3: 'CLIENTE',
};