import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = this.jwtService.decode(context.switchToHttp().getRequest().headers['authorization']);
    console.log(context.switchToHttp().getRequest().headers)
    if (token) return true;
    return false;
  }
}
