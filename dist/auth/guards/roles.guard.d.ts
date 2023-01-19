import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/core/enums/userRoles.enum';
export declare class RolesGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    matchRoles(roles: Role[], user: any): boolean;
    canActivate(context: ExecutionContext): boolean;
}
