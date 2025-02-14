import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly roles: string[]) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !this.roles.includes(user.tipo)) {
            throw new ForbiddenException('Access denied');
        }
        return true;
    }
}