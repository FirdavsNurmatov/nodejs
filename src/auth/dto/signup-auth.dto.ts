import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Roles } from 'src/common/enums/role';
import { UserStatus } from 'src/common/enums/user.status';

export class SignUpAuthDto {
  @ApiProperty({
    type: String,
    description: 'User name',
  })
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    type: String,
    description: 'User username',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @ApiProperty({
    type: String,
    description: 'User password',
  })
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    type: Number,
    description: "User's age",
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    type: String,
    description: 'User gender',
    enum: ['MALE', 'FEMALE'],
  })
  gender: string;

  @ApiProperty({
    type: String,
    description: 'User status',
    enum: UserStatus,
  })
  status: UserStatus;

  @ApiProperty({
    type: String,
    description: 'User role  default student',
    enum: Roles,
  })
  role: Roles;
}
