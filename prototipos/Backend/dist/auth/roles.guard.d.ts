import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RolesGuard implements CanActivate {
    private readonly roles;
    constructor(roles: string[]);
    canActivate(context: ExecutionContext): boolean;
}
