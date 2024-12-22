import { Inject, Injectable } from '@nestjs/common';
import { SignUpAuthDto } from '../dto/signup-auth.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @Inject('AUTH_REPOSITORY') private readonly authModel: typeof User,
  ) {}

  async signUp(user: SignUpAuthDto) {
    return await this.authModel.create({
      name: user.name,
      username: user.username,
      password: user.password,
      age: user.age,
      gender: user.gender,
      status: user.status,
      role: user.role,
    });
  }

  async signIn(userName: string, userPassword: string) {
    return await this.authModel.findAll({
      where: { username: userName, password: userPassword },
    });
  }
}
