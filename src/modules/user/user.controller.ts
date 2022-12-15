import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/common/interfaces/user-info.interface';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/utils/types/get-user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard())
  userInformation(@GetUser() user: User): Promise<UserInfo> {
    return this.userService.userInformation(user);
  }
}
