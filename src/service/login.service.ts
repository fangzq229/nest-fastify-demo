import {
  Injectable,
  Inject,
  HttpVersionNotSupportedException,
  HttpStatus,
  NotImplementedException,
  HttpException,
} from '@nestjs/common';
import { BaseService } from '@/core/base/base.service';
import { LoginPwdIn } from '../core/dto/login.dto';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { ConstUserinfo, UserinfoModel } from '@/core/models/userinfo.model';

@Injectable()
export class LoginService extends BaseService {
  @InjectModel(UserinfoModel)
  private readonly userinfoModel: typeof UserinfoModel;

  @Inject()
  private readonly configService: ConfigService;

  async pwd(param: LoginPwdIn): Promise<any> {
    const res = await this.userinfoModel.findOne({
      where: {
        [ConstUserinfo.USERNAME]: param.username,
        [ConstUserinfo.PASSWORD]: param.passwrod,
      },
      attributes: [ConstUserinfo.ID],
      raw: true,
    });
    if (!res) {
      throw new HttpException('username or passwrod error', 511);
    }
    this.logger.info(res);
    const token = await this._createToken({ id: '1111', username: '2222' });
    return { token };
  }

  private async _createToken(param: { id: string; username: string }) {
    const jwtConfig = this.configService.get('jwt');
    const token = await sign(param, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });
    return token;
  }
}
