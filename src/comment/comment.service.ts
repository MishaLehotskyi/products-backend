import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addCommentToProduct(
    productId: number,
    commentDescription: string,
  ): Promise<Comment> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const comment = this.commentRepository.create({
      productId,
      description: commentDescription,
      date: new Date().toISOString(),
      product,
    });

    return this.commentRepository.save(comment);
  }

  async deleteComment(commentId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    await this.commentRepository.remove(comment);
  }
}
