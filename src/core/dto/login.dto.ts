import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator'; // 参数验证
export class LoginPwdIn {
  @ApiProperty({ description: 'username' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'password' })
  @IsString()
  passwrod: string;
}
