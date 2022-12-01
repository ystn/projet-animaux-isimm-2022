import { Injectable } from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReportDto } from './dto';

@Injectable()
export class ReportService {
  constructor(private prismaService: PrismaService, private postService: PostService) { }

  async create(createReportDto: CreateReportDto) {
    try {
      await this.prismaService.report.create({ data: createReportDto });
      if ((await this.prismaService.report.findMany({where: {postId: createReportDto.postId}})).length >= 5)
        this.postService.setInvisible(createReportDto.postId);
      return { ok: true }
    } catch (e) {
      console.log(e)
      return { ok: false }
    }
  }

  async findAll() {
    try {
      return { reports: await this.prismaService.report.findMany({ include: { post: true, user: true } }), ok: true };
    } catch (e) {
      return { ok: false }
    }
  }

  async findForPost(id: number) {
    try {
      return { reports: await this.prismaService.report.findMany({ where: { postId: id }, include: { user: true } }), ok: true };
    } catch (e) {
      return { ok: false }
    }
  }

  async findOne(id: number) {
    try {
      return { report: await this.prismaService.report.findMany({ where: { id }, include: { post: true, user: true } }), ok: true };
    } catch (e) {
      return { ok: false }
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.report.delete({ where: { id } });
      return { ok: true }
    } catch (e) {
      return { ok: false }
    }
  }
}
