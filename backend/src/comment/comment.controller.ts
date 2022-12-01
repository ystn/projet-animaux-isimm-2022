import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateFeedbackDto, FindDto } from './dto';
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
  async findMany(@Param('id') id: string, @Query() findDto: FindDto) {
    const {type} = findDto
    if (!type) return await this.commentService.findOne(+id);
    if (type === "from")
      return await this.commentService.findFromUser(+id);
    else if (type === "to")
      return await this.commentService.findPerUser(+id);
    else if (type === "post")
      return await this.commentService.findForCommentable(+id);
    return {ok:false}
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }

  @Post('feedback')
  feedbackPost(@Body() createFeedbackDto: CreateFeedbackDto){
    return this.commentService.addFeedback(createFeedbackDto);
  }

  @Delete('feedback/:postId/:userId')
  removeFeedbackPost(@Param() removeFeedbackDto){
    console.log(removeFeedbackDto)
    return this.commentService.removeFeedback(removeFeedbackDto);
  }
}
