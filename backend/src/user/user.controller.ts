import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { FollowDto, FindDto, CreateCreditCardDto, UpdateCreditCardDto } from "./dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('follow')
    follow(@Body() followDto: FollowDto) {
        return this.userService.follow(followDto);
    }

    @Get(':id')
    find(@Param('id') id: string, @Query() findDto: FindDto) {
        const {type} = findDto;
        if(!type) return {user: this.userService.findById(+id), ok:true};
        if(type === 'followers')
            return this.userService.findFollowers(+id);
        else if(type === 'follows')
            return this.userService.findFollows(+id);
        return {ok:false}
    }

    @Post('credit-card')
    createCreditCard(@Body() createCreditCardDto: CreateCreditCardDto) {
        return this.userService.createCreditCard(createCreditCardDto);
    }

    @Patch('credit-card/:userId')
    updateCreditCard(@Param('userId') userId: string, @Body() updateCreditCardDto: UpdateCreditCardDto) {
        return this.userService.updateCreditCard(+userId, updateCreditCardDto)
    }

    @Get('credit-card/:userId')
    findCreditCard(@Param('userId') userId: string) {
        return this.userService.getCreditCard(+userId);
    }
}