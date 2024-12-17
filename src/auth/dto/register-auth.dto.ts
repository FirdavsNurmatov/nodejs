import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class RegisterAuthDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;

  @IsEnum(Role)
  role: Role;
}
