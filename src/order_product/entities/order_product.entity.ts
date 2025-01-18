import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Order, (order) => order.id)
  order_id: Order[];

  @OneToMany(() => Product, (product) => product.id)
  product_id: Product[];
}
