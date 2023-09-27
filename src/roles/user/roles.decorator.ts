// ** Nest Imports
import { SetMetadata } from '@nestjs/common';
import { UserRole } from './user.role';

export const ROLES_KEY = 'roles';
export const Role = (role: UserRole) => SetMetadata(ROLES_KEY, role);
