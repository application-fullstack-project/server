import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/db/user/role';

type UserRoleTypes = keyof typeof UserRole;

export const Roles = (...roles: UserRoleTypes[]) => SetMetadata('roles', roles);
