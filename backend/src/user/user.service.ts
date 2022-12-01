import { Injectable } from '@nestjs/common';
import { execPath } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCreditCardDto, CreateUserDto, FollowDto, UpdateCreditCardDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async create(createUserDto: CreateUserDto) {
        try {
            await this.prismaService.user.create({ data: createUserDto });
            return { ok: true };
        } catch (e) {
            return { ok: false };
        }
    }

    async follow(followDto: FollowDto){
        try{
            const follower = await this.findById(followDto.followerId);
            const follow = await this.findById(followDto.followId);
            await this.prismaService.follow.create({data: {followId: follow.id, followerId: follower.id}});
        }catch(e){
            return {ok:false}
        }
    }

    async findFollowers(id: number) {
        try{
            return {followers: await this.prismaService.user.findMany({ where: {follows: {some: { followId: id }}}, select: {id: true, name: true, email: true, createdAt: true, username: true} }), ok:true};
        }catch(e){
            return {ok:false}
        }
    }

    async findFollows(id: number) {
        try{
            return {follows: await this.prismaService.user.findMany({ where: {followers: {some: { followerId: id }}}, select: {id: true, name: true, email: true, createdAt: true, username: true}  }), ok:true};
        }catch(e){
            return {ok:false}
        }
    }

    async findOne(email: string) {
        return await this.prismaService.user.findUniqueOrThrow({ where: { email } });
    }

    async findById(id: number) {
        return await this.prismaService.user.findUniqueOrThrow({ where: { id }, select: {id: true, name: true, email: true, createdAt: true, username: true}  });
    }

    async findPosts(id: number) {
        try{
            const user = await this.prismaService.user.findUnique({ where: { id }, include: { commentables: { include: { post: true, feedbacks: true, } } } });
            return {posts: user.commentables.map(({post, ...commentable}) => ({...commentable, ...post})), ok:true};
        }catch(e){
            return {ok:false}
        }
    }

    validateCreditCard(createCreditCard: CreateCreditCardDto | UpdateCreditCardDto) {
        return new Date() < new Date(createCreditCard.exp);
    }

    async createCreditCard(createCreditCardDto: CreateCreditCardDto){
        try{
            if(this.validateCreditCard(createCreditCardDto))
                await this.prismaService.creditCard.create({data: createCreditCardDto})
            else
                throw "error"
            return {ok:true}
        } catch(e) {
            return {ok:false}
        }
    }

    async updateCreditCard(userId:number, updateCreditCardDto: UpdateCreditCardDto){
        try{
            if(this.validateCreditCard(updateCreditCardDto))
                await this.prismaService.creditCard.update({where:{id:userId}, data: updateCreditCardDto})
            else throw "error"
            return {ok:true}
        } catch(e) {
            return {ok:false}
        }
    }

    async getCreditCard(userId:number){
        try{
            return {creditCard: await this.prismaService.creditCard.findUnique({where:{id:userId}}), ok:true}
        } catch(e) {
            return {ok:false}
        }
    }

}
