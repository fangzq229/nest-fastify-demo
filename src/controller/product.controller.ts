
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
import { ProductService } from '../service/product.service';
import { UserInfo, UserCreate, UserList } from '../core/dto/product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../core/base/base.controller';

@Controller({
  version: ['1'], //版本号
  path: 'product', // 路由
})
@ApiTags('Product')
export class ProductController extends BaseController {
  @Inject()
  private readonly productService: ProductService;

  @Get()
  @ApiOperation({ summary: 'Get User List' })
  @ApiResponse({ description: 'return user list' })
  async userList(@Query() param: UserList): Promise<any[]> {
    return await this.productService.userList(param);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User Info' })
  @ApiResponse({ description: 'return user info' })
  async userInfo(@Param() param: UserInfo): Promise<string> {
    return await this.productService.userInfo(param);
  }

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ description: 'return user id' })
  async userCreate(@Body() param: UserCreate): Promise<{ id: string }> {
    return await this.productService.userCreate(param);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ description: 'return user id' })
  async userDel(@Param() param: UserInfo): Promise<string> {
    return await this.productService.userDel(param);
  }
}
