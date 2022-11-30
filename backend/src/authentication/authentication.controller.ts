import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './guard';

@Controller('authentication')
export class AuthenticationController {
    constructor(private authenticationService: AuthenticationService) { }

    @UseGuards(LocalAuthGuard)
    @Post()
    login(@Request() req) {
        // this.authenticationService.validateUser(loginDto.email, loginDto.password);
        return this.authenticationService.login(req.user);
    }
}
