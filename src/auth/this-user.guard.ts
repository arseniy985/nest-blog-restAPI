import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ThisUserGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    
    const post = await this.prisma.post.findFirst({
      where: {
          id: Number(request.params.id)
      }
    })

    console.log(post)

    if (!post.id == this.jwtService.decode(request.headers['authorization']).id) return false
    request.post = post

    return true
  }
}
