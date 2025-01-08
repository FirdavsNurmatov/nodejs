import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class RegisterAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;

  @ApiProperty({ enum: [Role.User, Role.SuperAdmin, Role.Admin] })
  // @ApiQuery({ name: 'role', enum: Role })
  // async filterByRole(@Query('role') role: Role = Role.User) {}
  @IsEnum(Role)
  role: Role;
}
