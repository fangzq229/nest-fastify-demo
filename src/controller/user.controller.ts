import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserInfo, UserCreate, UserList } from '../core/dto/user.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { BaseController } from '../core/base/base.controller';

@Controller({
  version: ['1'], //版本号
  path: 'user', // 路由
})
@ApiTags('User')
@ApiSecurity('token')
export class UserController extends BaseController {
  @Inject()
  private readonly userService: UserService;

  @Get()
  @ApiOperation({ summary: 'Get User List' })
  @ApiResponse({ description: 'return user list' })
  async userList(@Query() param: UserList): Promise<any[]> {
    return await this.userService.userList(param);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User Info' })
  @ApiResponse({ description: 'return user info' })
  async userInfo(@Param() param: UserInfo): Promise<string> {
    return await this.userService.userInfo(param);
  }

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ description: 'return user id' })
  async userCreate(@Body() param: UserCreate): Promise<{ id: string }> {
    return await this.userService.userCreate(param);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ description: 'return user id' })
  async userDel(@Param() param: UserInfo): Promise<string> {
    return await this.userService.userDel(param);
  }
}
