import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '../core/base/base.service';
import { UserInfo, UserCreate, UserList } from '../core/dto/product.dto';

@Injectable()
export class ProductService extends BaseService {
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
