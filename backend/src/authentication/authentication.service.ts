import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { LoginDto, SignupDto } from './dto';

@Injectable()
export class AuthenticationService {
    constructor(private prismaService: PrismaService, private userService: UserService, private jwtService: JwtService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(email);
        if (user && verify(user.password, pass)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        const payload = { email: user.email, sub: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }

    async signup(signupDto: SignupDto) {
        const hashedPassword = await hash(signupDto.password);
        signupDto.password = hashedPassword;
        await this.userService.create(signupDto);
        const user = await this.userService.findOne(signupDto.email);
        const payload = { email: user.email, sub: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }
}
