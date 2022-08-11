import {
  Controller,
  Post,
  Body,
  Inject,
  Req,
  RawBodyRequest,
} from '@nestjs/common';
import { LoginService } from '../service/login.service';
import { LoginPwdIn } from '../core/dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@/core/base/base.controller';
import { Public } from 'src/core/decorator/public.decorator';
import { FastifyRequest } from 'fastify';

@Controller({
  version: ['1'], //版本号
  path: 'login', // 路由
})
@ApiTags('Login')
@Public()
export class LoginController extends BaseController {
  @Inject()
  private readonly loginService: LoginService;

  @Post('pwd')
  @ApiOperation({ summary: 'Pwd login' })
  @ApiResponse({ description: 'return token' })
  async pwd(@Body() param: LoginPwdIn): Promise<any> {
    return await this.loginService.pwd(param);
  }

  @Post('bodyRaw')
  @ApiOperation({ summary: 'Pwd login' })
  @ApiResponse({ description: 'return token' })
  async bodyRaw(@Req() req: RawBodyRequest<FastifyRequest>): Promise<any> {
    // get request raw body (buffer)
    console.log(req.rawBody);
    return {};
  }
}
