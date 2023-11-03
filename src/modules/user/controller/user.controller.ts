import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {CreateUserDto, UserLoginDto} from '../../../common/dto/user.dto'
import { UserService } from '../service/user.service';
import { Roles } from 'src/common/schema/host.schema';
import { RoleGuard } from 'src/common/auth/guards/role.guard';
import { AuthGuard } from 'src/common/auth/guards/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('sign_up')
    signUp(@Body() CreateUserDto:CreateUserDto ) {
    return this.userService.signUp(CreateUserDto);
  }

    @Post('login')
    // @UseGuards(AuthGuard, new RoleGuard(Roles.User))
    login(@Body() userLoginDto:UserLoginDto ) {
    return this.userService.login(userLoginDto);
  }

    @Get('event_list')
    @UseGuards(AuthGuard, new RoleGuard(Roles.User))
    eventList(@Query("page") page : number,
    @Query("limit") limit : number){   
    return this.userService.eventList(page , limit);
  }
}
