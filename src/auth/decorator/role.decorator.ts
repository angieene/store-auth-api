import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { Role } from 'src/core/enums/userRoles.enum';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]): CustomDecorator<string> => {
  return SetMetadata(ROLES_KEY, roles);
};
