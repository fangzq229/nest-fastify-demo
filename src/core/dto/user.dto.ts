import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumberString, IsString } from 'class-validator'; // 参数验证
export class UserList {
  @ApiProperty({ description: 'page' })
  @IsNumberString()
  page: string;

  @ApiProperty({ description: 'pageSize' })
  @IsNumberString()
  pageSize: string;
}

export class UserInfo {
  @ApiProperty({ description: 'uid' })
  @IsString()
  id: string;
}

export class UserCreate {
  @ApiProperty({ description: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'eamil' })
  @IsEmail()
  email: string;
}
