import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('userRepo') private readonly userRepository: UserRepository,
  ) {}

  findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    const data = await this.userRepository.findById(id);
    if (!data) {
      throw new NotFoundException('User not found!');
    }
    return data;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const data = await this.userRepository.updateById(id, updateUserDto);
    if (!data) {
      throw new NotFoundException('User not found!');
    }
    return 'Updated.';
  }

  async remove(id: string) {
    const data = await this.userRepository.deleteById(id);
    if (!data) {
      throw new NotFoundException('User not found!');
    }
    return data;
  }
}
