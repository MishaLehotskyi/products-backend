import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  description: string;

  @Column()
  date: string;

  @ManyToOne(() => Product, (product) => product.comments)
  product: Product;
}
