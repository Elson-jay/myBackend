import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken'; 
import { ROLES_KEY } from 'src/hooks/roles.decorator';

export interface AuthenticatedRequest extends Request {
  user?: { id: number, roleId?:number };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<number[]>(ROLES_KEY, context.getHandler());

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; 
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException("Please provide a valid token!");
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded: any = jwt.verify(token, 'defaultSecret'); 

      (request as AuthenticatedRequest).user = {
        id:decoded.id,
        roleId:decoded.roleId
      }
      request.user = decoded; 

      if (!requiredRoles.includes(decoded.roleId)) {
        throw new ForbiddenException('Access denied: Insufficient role permissions');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException({message:"Invalid or expired token!",code:403});
    }
  }
}
