import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateDonateDto, UpdateDonateDto } from './dto';

@Injectable()
export class DonateService {
  constructor(private prismaService: PrismaService, private readonly userService: UserService) { }

  async create(createDonateDto: CreateDonateDto) {
    try {
      const commentable = await this.prismaService.commentable.create({ data: { userId: createDonateDto.userId } });
      const taggable = await this.prismaService.taggable.create({ data: {} });
      for (let t of createDonateDto.tags) {
        let tag = await this.prismaService.tag.findFirst({where: {nom: t}});
        if(!tag) tag = await this.prismaService.tag.create({ data: { nom: t } })
        await this.prismaService.tagTaggable.create({ data: { taggableId: taggable.id, tagId: tag.id } })
      }
      return { donate: await this.prismaService.post.create({ data: { id: commentable.id, taggableId: taggable.id, titre: createDonateDto.titre, corps: createDonateDto.corps } }), ok: true };
    } catch (e) {
      return { ok: false };
    }
  }

  async findAll() {
    try {
      return { donates: await this.prismaService.post.findMany({ where: {donatable: false}, orderBy: {commentable: {createdAt: 'desc'}}}), ok: true};
    } catch (e) {
      return { ok: false };
    }
  }

  async findAllUser(id: number) {
    try {
      return {donates: await this.prismaService.post.findMany({ where: { commentable: { user: { id } }, donatable: false}, include: {taggable: {select: {tags: true}}}, orderBy: {commentable: {createdAt: 'desc'}} }), ok: true};
    } catch(e) {
      return {ok: false}
    }
  }

  async findViewUser(id: number) {
    try {
      return {donates: await this.prismaService.post.findMany({ where: { commentable: { user: { id } }, published: true, donatable: false }, include: {taggable: {select: {tags: true}}}, orderBy: {commentable: {createdAt: 'desc'}} }), ok: true};
    } catch(e) {
      return {ok: false}
    }
  }

  async findByTags(tags: string[]) {
    try{
    return {donates: await this.prismaService.post.findMany({where: {taggable: {tags: {some: {tag: {nom: {in: tags}}}}}, published: true, donatable: false}, orderBy: {commentable: {createdAt: 'desc'}}}), ok:true};
    }catch(e){
      return {ok:false}
    }
  }

  async findAllFollower(id: number) {
    try {
      const follows = await this.userService.findFollows(id);
      const followsId = follows.follows.map(f => f.id);
      await this.prismaService.post.findMany({ where: {commentable: {user: {id: {in: followsId}}}, published: true, donatable: true}, orderBy: {commentable: {createdAt: 'desc'}}});
    } catch(e) {
      return {ok: false}
    }
  }

  async findOne(id: number) {
    try {
      const donate = await this.prismaService.post.findUnique({where: {id}, include: { taggable: {include: {tags:true}} }})
      if(donate.published && donate.donatable)
        return {donate, ok: true};
      else throw "error"
    } catch(e) {
      return {ok: false}
    }
  }

  async update(id: number, updateDonateDto: UpdateDonateDto) {
    try {
      await this.prismaService.post.update({where: {id}, data: updateDonateDto});
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

  async donate(id: number, userId: number, donation: number) {
    try {
      await this.prismaService.creditCard.findUnique({where:{id:userId}});
      const donate = await this.prismaService.post.findUnique({where:{id}});
      await this.prismaService.post.update({where:{id}, data: {amount: donate.amount+donation}});
      return {ok:true}
    }catch(e){
      return {ok:false}
    }
  }

  async setInvisible(id: number) {
    await this.prismaService.post.update({where: {id}, data: {published: false}});
  }

  async setVisible(id: number) {
    await this.prismaService.post.update({where: {id}, data: {published: true}});
  }
}
