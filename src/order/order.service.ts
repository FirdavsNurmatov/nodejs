import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const data = await this.orderRepository.save(createOrderDto);

    return data;
  }

  async findAll() {
    const data = await this.orderRepository.find();
    if (data.length === 0) {
      throw new NotFoundException('No data found');
    }
    return data;
  }

  async findOne(id: number) {
    const data = await this.orderRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException('Order not found');
    }

    return data;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const data = await this.orderRepository.update(id, updateOrderDto);
    if (data.affected === 0) {
      throw new NotFoundException('Order not found');
    }
    return 'Order updated successfully';
  }

  async remove(id: number) {
    const data = await this.orderRepository.delete(id);
    if (data.affected === 0) {
      throw new NotFoundException('Order not found');
    }
    return 'Order deleted successfully';
  }
}
