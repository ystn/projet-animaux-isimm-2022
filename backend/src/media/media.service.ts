import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMediaDto, UpdateMediaDto } from './dto';

@Injectable()
export class MediaService {
  constructor(private prismaService: PrismaService) { }

  async create(createMediaDto: CreateMediaDto, file: Express.Multer.File) {
    // Prisma.MediaCreateInput
    const taggable = await this.prismaService.taggable.create({ data: {} });
    for (let t of createMediaDto.tags) {
      const tag = await this.prismaService.tag.create({ data: { nom: t } })
      await this.prismaService.tagTaggable.create({ data: { taggableId: taggable.id, tagId: tag.id } })
    }
    const media = await this.prismaService.media.create({ data: { id: taggable.id, order: createMediaDto.order, path: file.filename, type: createMediaDto.type } })
    return media.id;
  }

  findAll() {
    return `This action returns all media`;
  }

  async findOne(id: number) {
    const media = await this.prismaService.media.findUnique({ where: { id: id } })
    return media;
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
