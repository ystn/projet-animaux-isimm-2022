import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) { }

  async create(createCommentDto: CreateCommentDto) {
    try {
      const commentable = await this.prismaService.commentable.create({ data: { userId: createCommentDto.userId } });
      await this.prismaService.comment.create({ data: { id: commentable.id, corps: createCommentDto.corps, commentedToId: createCommentDto.commentedToId } });
      return { data: await this.findOne(commentable.id), ok: true };
    } catch (e) {
      return { ok: false };
    }
  }

  async findAll() {
    try {
      return { data: await this.prismaService.comment.findMany({ include: { commentable: { include: { user: true } }, commentedTo: true } }), ok: true };
    } catch (e) {
      return { ok: false };
    }
  }

  async findForCommentable(id: number) {
    try {
      return { data: await this.prismaService.comment.findMany({ where: { commentedToId: id }, include: { commentable: { include: { user: true } }, commentedTo: true } }), ok: true };
    } catch (e) {
      return { ok: false };
    }
  }

  async findForUser(id: number) {
    try {
      return { data: await this.prismaService.comment.findMany({ where: { commentedTo: { userId: id } } }), ok: true };
    } catch (e) {
      return { ok: false }
    }
  }

  async findFromUser(id: number) {
    try {
      return { data: await this.prismaService.comment.findMany({ where: { commentable: { userId: id } } }), ok: true };
    } catch (e) {
      return { ok: false }
    }
  }

  async findOne(id: number) {
    try {
      return { data: await this.prismaService.comment.findUnique({ where: { id }, include: { commentable: { include: { user: true } }, commentedTo: true } }), ok: true };
    } catch (e) {
      return { ok: false };
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      return { data: await this.prismaService.comment.update({ where: { id: updateCommentDto.id }, data: { corps: updateCommentDto.corps } }), ok: true };
    } catch (e) {
      return { ok: false };
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.comment.delete({ where: { id } });
      return { ok: true };
    } catch (e) {
      return { ok: false };
    }
  }
}
