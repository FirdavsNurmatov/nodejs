import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async register(user: RegisterAuthDto): Promise<User> {
    try {
      const newUser = new this.userModel(user);
      await newUser.save();

      return newUser;
    } catch (error) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        throw new NotFoundException('USER alaready exists');
      }
    }
  }

  login(userEmail: string, userPassword: string): Promise<User> {
    return this.userModel
      .findOne({ email: userEmail, password: userPassword })
      .exec();
  }
}
