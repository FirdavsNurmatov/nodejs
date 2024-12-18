import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Role } from 'src/enums/role.enum';

@Table({ tableName: 'users' }) // Defines the table name
export class User extends Model {
  @Column({
    type: DataType.STRING,
    validate: {
      len: [2], // Minimum length validation
    },
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    validate: {
      len: [2], // Minimum length validation
    },
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true, // Ensures email uniqueness
    validate: {
      isEmail: true, // Ensures valid email format
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [4], // Minimum length for password
    },
  })
  password: string;

  @Column({
    type: DataType.ENUM(Role.User, Role.Admin, Role.SuperAdmin), // ENUM type for role
    defaultValue: Role.User, // Default role
  })
  role: Role;
}
