import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('type') type: string) {
    // @Query('from') from?: string, @Query('for') forUser?: string, @Query('commentedTo') commentedTo?: string) {
    // if (from)
    if (type === "from")
      return await this.commentService.findFromUser(+id);
    // else if (forUser)
    else if (type === "for")
      return await this.commentService.findForUser(+id);
    // else if (commentedTo)
    else if (type === "commentedTo")
      return await this.commentService.findForCommentable(+id);
    return await this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
