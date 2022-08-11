import {
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  DataType,
  Table,
} from 'sequelize-typescript';
const { STRING } = DataType;
import * as FlakeId from 'flake-idgen';
import * as intformat from 'biguint-format';
// 多进程id 处理 防止生产重复的雪花id 最大值 999
const clusterId = Number(
  process.pid.toString().substring(process.pid.toString().length - 3),
);
const flakeIdgen = new FlakeId({
  id: 23 + clusterId, // 有效最大值 1024
  epoch: 1300000000000,
});
import * as _ from 'lodash';

@Table
export class BaseModel extends Model {
  @Column({
    type: STRING,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    defaultValue: () => _.toString(intformat(flakeIdgen.next(), 'dec')),
  })
  id: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @DeletedAt
  @Column
  deletedAt: Date;
}
