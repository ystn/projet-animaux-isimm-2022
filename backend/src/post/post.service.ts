import { Injectable } from '@nestjs/common';
import { FeedbackType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateFeedbackDto, CreateMediaDto, CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService, private readonly userService: UserService) { }

  async create(createPostDto: CreatePostDto) {
    try {
      const commentable = await this.prismaService.commentable.create({ data: { userId: createPostDto.userId } });
      const taggable = await this.prismaService.taggable.create({ data: {} });
      for (let t of createPostDto.tags) {
        let tag = await this.prismaService.tag.findFirst({where: {nom: t}});
        if(!tag) tag = await this.prismaService.tag.create({ data: { nom: t } })
        await this.prismaService.tagTaggable.create({ data: { taggableId: taggable.id, tagId: tag.id } })
      }
      // const media = await this.prismaService.media.create({ data: { id: taggable.id, order: createMediaDto.order, path: file.filename, type: createMediaDto.type } })
      return { post: await this.prismaService.post.create({ data: { id: commentable.id, taggableId: taggable.id, titre: createPostDto.titre, corps: createPostDto.corps } }), ok: true };
    } catch (e) {
      return { ok: false };
    }
  }

  async findAll() {
    try {
      return { posts: await this.prismaService.post.findMany({ where: {donatable: false}, orderBy: {commentable: {createdAt: 'desc'}}}), ok: true};
    } catch (e) {
      return { ok: false };
    }
  }

  async findAllUser(id: number) {
    try {
      return {posts: await this.prismaService.post.findMany({ where: { commentable: { user: { id } }, donatable: false}, include: {taggable: {select: {tags: true}}}, orderBy: {commentable: {createdAt: 'desc'}} }), ok: true};
    } catch(e) {
      return {ok: false}
    }
  }

  async findViewUser(id: number) {
    try {
      return {posts: await this.prismaService.post.findMany({ where: { commentable: { user: { id } }, published: true, donatable: false }, include: {taggable: {select: {tags: true}}}, orderBy: {commentable: {createdAt: 'desc'}} }), ok: true};
    } catch(e) {
      return {ok: false}
    }
  }

  async findByTags(tags: string[]) {
    try{
    return {posts: await this.prismaService.post.findMany({where: {taggable: {tags: {some: {tag: {nom: {in: tags}}}}}, published: true, donatable: false}, orderBy: {commentable: {createdAt: 'desc'}}}), ok:true};
    }catch(e){
      return {ok:false}
    }
  }

  async findAllFollower(id: number) {
    try {
      const follows = await this.userService.findFollows(id);
      const followsId = follows.follows.map(f => f.id)
      await this.prismaService.post.findMany({ where: {commentable: {user: {id: {in: followsId}}}, published: true, donatable: false}, orderBy: {commentable: {createdAt: 'desc'}}});
    } catch(e) {
      return {ok: false}
    }
  }

  async findOne(id: number) {
    try {
      const post = await this.prismaService.post.findUnique({where: {id}, include: {taggable: {include: {tags:true}} }});
      if(!post.donatable && post.published)
        return {post: await this.prismaService.post.findUnique({where: {id}}), ok: true};
      else throw "error"
    } catch(e) {
      return {ok: false}
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      await this.prismaService.post.update({where: {id}, data: updatePostDto});
      return {ok: true};
    } catch(e) {
      return {ok: false}
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.commentable.delete({where: {id}});
      return {ok: true};
    } catch(e) {
      return {ok: false}
    }
  }

  async setInvisible(id: number) {
    await this.prismaService.post.update({where: {id}, data: {published: false}});
  }

  async setVisible(id: number) {
    await this.prismaService.post.update({where: {id}, data: {published: true}});
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
