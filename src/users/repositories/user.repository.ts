import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: typeof User,
  ) {}

  // async register(user: RegisterAuthDto): Promise<User> {
  //   try {
  //     const newUser = new this.userModel(user);
  //     await newUser.save();
  //     users.push(newUser);

  //     return newUser;
  //   } catch (error) {
  //     if (error.name === 'MongoServerError' && error.code === 11000) {
  //       throw new NotFoundException('USER alaready exists');
  //     }
  //   }
  // }

  // login(userEmail: string, userPassword: string): Promise<User> {
  //   return this.userModel
  //     .findOne({ email: userEmail, password: userPassword })
  //     .exec();
  // }

  async findAll(): Promise<User[]> {
    const newUsers = await this.userModel.findAll();
    return newUsers;
  }

  findById(userId: string): Promise<User> {
    return this.userModel.findOne({ id: userId });
  }

  updateById(userId: string, userData: UpdateUserDto): Promise<User> {
    return this.userModel;
  }

  deleteById(userId: string): Promise<User> {
    return this.userModel.findByIdAndDelete({ _id: userId }).exec();
  }
}
