import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { User } from '../../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(user: RegisterAuthDto): Promise<User> {
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  login(userEmail: string, userPassword: string): Promise<User> {
    return this.userRepository.findOneBy({
      email: userEmail,
      password: userPassword,
    });
  }
}
