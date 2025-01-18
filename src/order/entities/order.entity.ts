import { Status } from '../../enums/role.enum';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Product, (product) => product.id)
  product_id: Product[];

  @ManyToOne(() => User, (user) => user.id)
  user_id: User;

  @Column()
  total_price: number;

  @Column()
  status: Status;
}
