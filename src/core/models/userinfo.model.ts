import { Table, Column } from 'sequelize-typescript';
import { BaseModel } from '../base/base.model';
import { STRING } from 'sequelize';
// #region enum
// #endregion

@Table({
  tableName: 'userinfo',
})
export class UserinfoModel extends BaseModel {
  /**
   * 密码Md5
   */
  @Column({ comment: '密码Md5', type: STRING })
  password: string;

  /**
   * 权限
   */
  @Column({ comment: '权限', type: STRING })
  roles: string;

  /**
   * 用户名
   */
  @Column({ comment: '用户名', type: STRING })
  username: string;
}

// 常量生成
export class ConstUserinfo {
  /**
   * createdAt
   */
  static readonly CREATED_AT: string = 'createdAt';
  /**
   * deletedAt
   */
  static readonly DELETED_AT: string = 'deletedAt';
  /**
   * id
   */
  static readonly ID: string = 'id';
  /**
   * password
   */
  static readonly PASSWORD: string = 'password';
  /**
   * roles
   */
  static readonly ROLES: string = 'roles';
  /**
   * updatedAt
   */
  static readonly UPDATED_AT: string = 'updatedAt';
  /**
   * username
   */
  static readonly USERNAME: string = 'username';
}
