import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Comment } from '../comment/comment.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  create(product: Partial<Product>): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['comments'] });
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
  }

  async update(id: number, product: Partial<Product>): Promise<any> {
    const result = await this.findOne(id);

    const updatedProduct = { ...result, ...product };

    return await this.productRepository.save(updatedProduct);
  }

  async remove(id: number): Promise<any> {
    const product = await this.findOne(id);

    for (const comment of product.comments) {
      await this.commentRepository.delete(comment.id);
    }

    await this.productRepository.delete(id);

    return id;
  }
}
