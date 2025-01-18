import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'src/pagination/pagination';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async pagination(pagination: Pagination) {
    const [product, total] = await this.productRepository.findAndCount({
      skip: pagination.offset,
      take: pagination.limit,
    });

    return { product, total };
  }

  async findAll() {
    const allData = await this.productRepository.find();
    if (allData.length === 0) {
      throw new NotFoundException('No data found');
    }

    return allData;
  }

  async findOne(id: number) {
    const data = await this.productRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException('Data not found');
    }

    return data;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updatedData = await this.productRepository.update(
      id,
      updateProductDto,
    );
    if (updatedData.affected === 0) {
      throw new NotFoundException('Product not found');
    }

    return 'Data updated successfully';
  }

  async remove(id: number) {
    const data = await this.productRepository.delete(id);
    if (data.affected === 0) {
      throw new NotFoundException('Product not found');
    }

    return 'Product deleted successfully';
  }
}
