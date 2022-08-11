/*
 * @Author: 方振起
 * @Date: 2022-02-18 15:11:54
 * @Last Modified by: 方振起
 * @Last Modified time: 2022-08-05 13:39:29
 */

// 功能说明： 用来快速生成 controller service dto 文件 并初始化基本数据
const fs = require('fs');
// 中划线 转 小驼峰
function toHump(name) {
  return name.replace(/\-(\w)/g, (all, letter) => letter.toUpperCase());
}
// 中划线 转 大驼峰
function toCamel(name) {
  return name.replace(/(^|-)(\w)/g, (m, $1, $2) => $2.toUpperCase());
}

//直接调用命令
const fileName = process.argv[process.argv.length - 1];
console.log(fileName);
const serviceName = toHump(fileName);
const className = toCamel(fileName);
console.log(serviceName);
console.log(className);
// controller 写入内容
const conStr = `
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
import { ${className}Service } from '../service/${fileName}.service';
import { UserInfo, UserCreate, UserList } from '../core/dto/${fileName}.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../core/base/base.controller';

@Controller({
  version: ['1'], //版本号
  path: '${fileName}', // 路由
})
@ApiTags('${className}')
export class ${className}Controller extends BaseController {
  @Inject()
  private readonly ${serviceName}Service: ${className}Service;

  @Get()
  @ApiOperation({ summary: 'Get User List' })
  @ApiResponse({ description: 'return user list' })
  async userList(@Query() param: UserList): Promise<any[]> {
    return await this.${serviceName}Service.userList(param);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User Info' })
  @ApiResponse({ description: 'return user info' })
  async userInfo(@Param() param: UserInfo): Promise<string> {
    return await this.${serviceName}Service.userInfo(param);
  }

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ description: 'return user id' })
  async userCreate(@Body() param: UserCreate): Promise<{ id: string }> {
    return await this.${serviceName}Service.userCreate(param);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ description: 'return user id' })
  async userDel(@Param() param: UserInfo): Promise<string> {
    return await this.${serviceName}Service.userDel(param);
  }
}
`;
// serivce 写入内容
const serStr = `
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '../core/base/base.service';
import {
  UserInfo,
  UserCreate,
  UserList,
} from '../core/dto/${fileName}.dto';

@Injectable()
export class ${className}Service extends BaseService {
  
  // 获取列表
  async userList(param: UserList): Promise<any> {
    return [];
  }

  // 获取信息
  async userInfo(param: UserInfo): Promise<any> {
    return '';
  }

  // 创建
  async userCreate(param: UserCreate): Promise<any> {
    return { id: '1' };
  }

  // 删除
  async userDel(param: UserInfo): Promise<any> {
    return param.id;
  }
}
`;
// dto 写入内容
const dtoStr = `
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
`;
// // test 写入内容
// const testStr = `
// import { createApp, close, createHttpRequest } from '@midwayjs/mock';
// import { Framework } from '@midwayjs/web';
// import { findToken } from '../utils/auth-cache';
// import * as Schemas from '../../../src/lib/schemas/app-keyword';

// describe('test/app/controller/${fileName}.test.ts', () => {
//   let token = undefined;
//   let app = undefined;
//   beforeAll(async () => {
//     app = await createApp<Framework>();
//     token = await findToken(app);
//   });

//   afterAll(async () => {
//     await close(app);
//   });

//   it('should GET /api/${fileName}/list', async () => {
//     const result = await createHttpRequest(app)
//       .get('/api/${fileName}/list')
//       .set({ ...token })
//       .query({ page: 1, pageSize: 10 });

//     // 返回状态验证
//     expect(result.status).toBe(200);
//     // 返回参数验证
//     if (result && result.status === 200) {
//       expect(Schemas.SListOut.validate(result.body).error).toBe(undefined);
//     }
//     return;
//   });
// });
// `

// // 创建并写入 Controller
function createController() {
  fs.writeFile(
    `./src/controller/${fileName}.controller.ts`,
    conStr,
    'utf8',
    function (err) {
      if (err) console.log('controller 内容写入出错了，错误是：' + err);
      else console.log('controller 内容写入 ok');
    },
  );
}

// 创建并写入 Service
function createService() {
  fs.writeFile(
    `./src/service/${fileName}.service.ts`,
    serStr,
    'utf8',
    function (err) {
      if (err) console.log('service 内容写入出错了，错误是：' + err);
      else console.log('service 内容写入 ok');
    },
  );
}

// // 创建并写入 Schema
function createDto() {
  fs.writeFile(
    `./src/core/dto/${fileName}.dto.ts`,
    dtoStr,
    'utf8',
    function (err) {
      if (err) console.log('schemas 内容写入出错了，错误是：' + err);
      else console.log('schemas 内容写入 ok');
    },
  );
}


console.log(process.argv);
if (process.argv.includes('-controller')) {
  createController();
}

if (process.argv.includes('-service')) {
  createService();
}

if (process.argv.includes('-dto')) {
  createDto();
}

// if (process.argv.includes('-test')) {
//   createTest()
// }

if (process.argv.includes('-class')) {
  createDto();
  createService();
  createController();
}
