import { Injectable } from '@nestjs/common';
import { execPath } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) { }

  async create(createPostDto: CreatePostDto) {
    try {
      this.prismaService.userGroup.findFirstOrThrow({ where: { userId: createPostDto.userId, groupId: createPostDto.groupId } })

      const commentable = await this.prismaService.commentable.create({ data: { userId: createPostDto.userId } });
      const taggable = await this.prismaService.taggable.create({ data: {} });
      for (let t of createPostDto.tags) {
        const tag = await this.prismaService.tag.create({ data: { nom: t } })
        await this.prismaService.tagTaggable.create({ data: { taggableId: taggable.id, tagId: tag.id } })
      }
      return { data: await this.prismaService.post.create({ data: { id: commentable.id, taggableId: taggable.id, titre: createPostDto.titre, corps: createPostDto.corps, groupId: createPostDto.groupId } }), ok: true };
    } catch (e) {
      return { ok: false };
    }
  }

  findAll() {
    return `This action returns all post`;
  }

  findAllForum(groupId: number) {
    this.prismaService.post.findMany({ where: { groupId } })
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
