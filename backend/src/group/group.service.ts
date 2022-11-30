import { Injectable, HttpException } from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Group, Taggable, UserRole } from '@prisma/client';

import { CreateGroupDto, UpdateGroupDto } from './dto';

@Injectable()
export class GroupService {
  constructor(private prismaService: PrismaService, private postService: PostService) { }

  async create(createGroupDto: CreateGroupDto) {
    let group: Group;
    try {
      const taggable = await this.prismaService.taggable.create({ data: {} });
      group = await this.prismaService.group.create({ data: { id: taggable.id, url: createGroupDto.url, nom: createGroupDto.nom, description: createGroupDto.description } });
      const userGroup = await this.prismaService.userGroup.create({ data: { userId: createGroupDto.userId, groupId: group.id, role: UserRole.ADMIN } });
    } catch (e) {
      // throw new HttpException;
      return { ok: false };
    }
    return { ok: true, data: group };
  }


  async findAll() {
    return await this.prismaService.group.findMany();
  }

  async findOne(url: string) {
    let group = await this.prismaService.group.findUnique({ where: { url }, include: { posts: { include: { commentable: true } } } })
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    // return `This action updates a #${id} group`;
    // let group: Group;
    const group = await this.prismaService.group.update({ where: { id }, data: { description: updateGroupDto.description, nom: updateGroupDto.nom }, include: { taggable: { include: { tags: { include: { tag: true } } } } } })
    let tags = group.taggable.tags;
    for (let i of tags) {
      if (!(i.tag.nom in updateGroupDto.tags)) {

      }
    }
  }

  remove(id: number) {
    this.prismaService.group.delete({ where: { id } });
    return { ok: true };

  }
}
