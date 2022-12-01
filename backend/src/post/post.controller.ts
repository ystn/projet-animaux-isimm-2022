import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateFeedbackDto, CreateMediaDto, FindDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findMany(@Param('id') id: string, @Query() findDto: FindDto) {
    const {type, tags} = findDto;
    if(!type) return this.postService.findOne(+id);
    if(type === "admin")
      return this.postService.findAllUser(+id)
    else if(type === "user")
      return this.postService.findViewUser(+id);
    else if(type === "follower")
      return this.postService.findAllFollower(+id);
    else if(type === "tag")
      return this.postService.findByTags(tags)
    return {ok:false}
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }

  @Post('feedback')
  feedbackPost(@Body() createFeedbackDto: CreateFeedbackDto){
    return this.postService.addFeedback(createFeedbackDto);
  }

  @Delete('feedback/:postId/:userId')
  removeFeedbackPost(@Param() removeFeedbackDto){
    console.log(removeFeedbackDto)
    return this.postService.removeFeedback(removeFeedbackDto);
  }
}
