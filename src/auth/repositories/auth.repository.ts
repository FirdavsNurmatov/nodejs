import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
  ) {}

  async register(user: RegisterAuthDto): Promise<Auth> {
    try {
      const newUser = new this.authModel(user);
      await newUser.save();

      return newUser;
    } catch (error) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        throw new NotFoundException('USER alaready exists');
      }
    }
  }

  login(userEmail: string, userPassword: string): Promise<Auth> {
    return this.authModel
      .findOne({ email: userEmail, password: userPassword })
      .exec();
  }
}
