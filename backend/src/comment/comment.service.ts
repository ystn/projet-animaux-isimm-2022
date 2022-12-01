import { Injectable } from '@nestjs/common';
import { FeedbackType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto, CreateFeedbackDto, UpdateCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) { }

  async create(createCommentDto: CreateCommentDto) {
    try {
      const commentable = await this.prismaService.commentable.create({ data: {userId: createCommentDto.userId} });
      return { comment: await this.prismaService.comment.create({ data: { id: commentable.id, corps: createCommentDto.corps, commentedToId: createCommentDto.commentedToId } }), ok: true };
    } catch (e) {
      console.log(e);
      return { ok: false };
    }
  }

  async findAll() {
    try {
      return { comments: await this.prismaService.comment.findMany({ include: { commentable: { include: { user: true } }, commentedTo: true } }), ok: true };
    } catch (e) {
      return { ok: false };
    }
  }

  async findForCommentable(id: number) {
    try {
      return { comments: await this.prismaService.comment.findMany({ where: { commentedToId: id }, include: { commentable: { include: { user: true } }, commentedTo: true } }), ok: true };
    } catch (e) {
      return { ok: false };
    }
  }

  async findPerUser(id: number) {
    try {
      return { comments: await this.prismaService.comment.findMany({ where: { commentedTo: { userId: id } } }), ok: true };
    } catch (e) {
      return { ok: false }
    }
  }

  async findFromUser(id: number) {
    try {
      return { comments: await this.prismaService.comment.findMany({ where: { commentable: { userId: id } } }), ok: true };
    } catch (e) {
      return { ok: false }
    }
  }

  async findOne(id: number) {
    try {
      return { comment: await this.prismaService.comment.findUnique({ where: { id }, include: { commentable: { include: { user: true } }, commentedTo: true } }), ok: true };
    } catch (e) {
      return { ok: false };
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      console.log( await this.prismaService.comment.update({ where: { id }, data: updateCommentDto  }))
      return { comment: await this.prismaService.comment.update({ where: { id }, data: updateCommentDto  }), ok: true };
    } catch (e) {
      console.log(e)
      return { ok: false };
    }
  }

  async remove(id: number) {
    try {
      // await this.prismaService.comment.delete({ where: { id } });
      await this.prismaService.commentable.delete({where: {id}})
      return { ok: true };
    } catch (e) {
      return { ok: false };
    }
  }

  async addFeedback(createFeedbackDto: CreateFeedbackDto){
    const {postId: id, userId} = createFeedbackDto;
    try{
      const post = await this.findOne(id);
      const user = await this.prismaService.user.findUnique({where: {id:userId}});
      await this.prismaService.feedback.create({data:{commentableId: id, userId, feedbackType: FeedbackType.LIKE}})
      return{ok:true}
    }catch(e){
      return {ok:false}
    }
  }

  async removeFeedback(removeFeedbackDto){
    const {postId: id, userId} = removeFeedbackDto;
    try{
      const feedback = await this.prismaService.feedback.findFirst({where:{commentableId: +id, userId: +userId}})
      await this.prismaService.feedback.delete({where:{id: feedback.id}});
      return{ok:true}
    }catch(e){
      return {ok:false}
    }
  }
}
