import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @Inject('AUTH_REPOSITORY') private readonly userModel: typeof User,
  ) {}

  async register(user: RegisterAuthDto): Promise<User> {
    try {
      console.log(user);
      const newUser = this.userModel.create({ user });
      return newUser;
    } catch (error) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        throw new NotFoundException('USER alaready exists');
      }
    }
  }

  login(userEmail: string, userPassword: string) {
    return this.userModel.findAll({
      where: { email: userEmail, password: userPassword },
    });
  }
}
