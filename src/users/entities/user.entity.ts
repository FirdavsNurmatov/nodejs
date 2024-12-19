import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Role } from 'src/enums/role.enum';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM(Role.User, Role.Admin, Role.SuperAdmin),
    defaultValue: Role.User,
  })
  role: Role;
}
