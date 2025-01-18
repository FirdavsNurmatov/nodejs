import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';

export class CreateOrderProductDto {
  //   @ApiProperty()
  //   @IsNotEmpty()
  //   @IsNumber()
  //   @Min(1)
  //   order_id: Order;
  //   @ApiProperty()
  //   @IsNotEmpty()
  //   @IsNumber()
  //   @Min(1)
  //   product_id: number;
}
