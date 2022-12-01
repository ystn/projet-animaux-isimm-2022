import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto, SignupDto } from './dto';
import { LocalAuthGuard } from './guard';

@Controller('authentication')
export class AuthenticationController {
    constructor(private authenticationService: AuthenticationService) { }

    // @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Body() user: LoginDto) {
        return this.authenticationService.login(user);
    }

    @Post('signup')
    signup(@Body() user: SignupDto) {
        return this.authenticationService.signup(user);
    }
}
