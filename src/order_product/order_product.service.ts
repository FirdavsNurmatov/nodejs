import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order_product.dto';
import { UpdateOrderProductDto } from './dto/update-order_product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProduct } from './entities/order_product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
  ) {}

  async create(createOrderProductDto: CreateOrderProductDto) {
    const data = await this.orderProductRepository.save(createOrderProductDto);

    return data;
  }

  async findAll() {
    const data = await this.orderProductRepository.find();
    if (data.length === 0) {
      throw new NotFoundException('No data found');
    }

    return data;
  }

  async findOne(id: number) {
    const data = await this.orderProductRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException('Order product not found');
    }

    return data;
  }

  async update(id: number, updateOrderProductDto: UpdateOrderProductDto) {
    const data = await this.orderProductRepository.update(
      id,
      updateOrderProductDto,
    );
    if (data.affected === 0) {
      throw new NotFoundException('Order product not found');
    }

    return 'Order product updated successfully';
  }

  async remove(id: number) {
    const data = await this.orderProductRepository.delete(id);
    if (data.affected === 0) {
      throw new NotFoundException('Order product not found');
    }
    return 'Order product deleted successfully';
  }
}
