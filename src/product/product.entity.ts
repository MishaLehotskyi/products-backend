import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  name: string;

  @Column()
  count: number;

  @Column('jsonb')
  size: { width: number; height: number };

  @Column()
  weight: string;

  @OneToMany(() => Comment, (comment) => comment.product)
  comments: Comment[];
}
