import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReportDto } from './dto';

@Injectable()
export class ReportService {
  constructor(private prismaService: PrismaService) { }

  async create(createReportDto: CreateReportDto) {
    try {
      await this.prismaService.report.create({ data: { userId: createReportDto.userId, postId: createReportDto.postId, description: createReportDto.description } });
      return { ok: true }
    } catch (e) {
      return { ok: false }
    }
  }

  async findAll() {
    try {
      return { data: await this.prismaService.report.findMany({ include: { post: true, user: true } }), ok: true };
    } catch (e) {
      return { ok: false }
    }
  }

  async findForPost(id: number) {
    try {
      return { data: await this.prismaService.report.findMany({ where: { postId: id }, include: { user: true } }), ok: true };
    } catch (e) {
      return { ok: false }
    }
  }

  async findOne(id: number) {
    try {
      return { data: await this.prismaService.report.findMany({ where: { id }, include: { post: true, user: true } }), ok: true };
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
