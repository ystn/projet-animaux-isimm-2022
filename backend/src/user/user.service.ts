import { Injectable } from '@nestjs/common';
import { execPath } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async create(createUserDto: CreateUserDto) {
        try {
            this.prismaService.user.create({ data: { name: createUserDto.name, username: createUserDto.username, email: createUserDto.email, password: createUserDto.password } });
            return { ok: true };
        } catch (e) {
            return { ok: false };
        }
    }

    async findOne(email: string) {
        return await this.prismaService.user.findUnique({ where: { email } });
    }

    async findGroups(username: string) {
        const user = await this.prismaService.user.findUnique({ where: { username } })
        return await this.prismaService.group.findMany({ where: { userGroups: { some: { userId: user.id } } } });
    }
}
