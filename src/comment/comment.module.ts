import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Product } from '../product/product.entity';
import { CommentsController } from './comment.controller';
import { CommentsService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Product])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
