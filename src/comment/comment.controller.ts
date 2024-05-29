import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CreateCommentDto } from './create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':productId')
  async addCommentToProduct(
    @Param('productId') productId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const { description } = createCommentDto;
    return await this.commentsService.addCommentToProduct(
      productId,
      description,
    );
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    await this.commentsService.deleteComment(id);
  }
}
