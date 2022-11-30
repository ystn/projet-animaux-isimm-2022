import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @Post()
  // @UseInterceptors(FileInterceptor('files'))
  @UseInterceptors(FileInterceptor('file'))
  // create(@Body() createMediaDto: CreateMediaDto, @UploadedFiles() files: Array<Express.Multer.File>) {
  create(@Body() createMediaDto: CreateMediaDto, @UploadedFiles() file: Express.Multer.File) {
    // return this.mediaService.create(createMediaDto, files);
    return this.mediaService.create(createMediaDto, file);
  }

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(+id, updateMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(+id);
  }
}
