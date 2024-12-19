import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userModel: typeof User,
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
    return this.userModel.findByPk(userId);
  }

  updateById(userId: string, userData: UpdateUserDto) {
    return this.userModel.update(userData, { where: { id: userId } });
  }

  deleteById(userId: string) {
    return this.userModel.destroy({ where: { id: userId } });
  }
}
