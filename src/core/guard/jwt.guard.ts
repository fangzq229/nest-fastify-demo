import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtGuard implements CanActivate {
  @Inject()
  private readonly configService: ConfigService;

  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: any = context.switchToHttp().getRequest();
    const token = request.headers['token'] || request.headers['Token'];
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const res = token ? await this._verifyJwt(token, request) : false;
    if (!isPublic && !res) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private async _verifyJwt(token, req): Promise<boolean> {
    const jwtConfig = this.configService.get('jwt');
    try {
      const res: any = await verify(token, jwtConfig.secret);
      if (res) {
        // set request content (@fastify/request-context)
        req.requestContext.set('user', { id: res.id });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
