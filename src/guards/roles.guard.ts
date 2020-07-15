import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // console.log(user)
    // const hasRole = () => user.roles.some(role => !!roles.find(item => item === role));
    var i = 0;
    for(var role of roles){
      if( role == user.roles){
        i+=1;
      }
    }
    if(i == 0){
      return false;
    }
    return user && user.roles ;
  }
}