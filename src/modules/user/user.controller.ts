import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserInfo } from 'src/common/interfaces/user-info.interface';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/utils/types/get-user.decorator';
import { UpdateUserAvatarDTO } from './dto/update-user-avatar.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: User, isArray: true })
  @ApiBadRequestResponse()
  userInformation(@GetUser() user: User): Promise<UserInfo> {
    return this.userService.userInformation(user);
  }

  @Patch('update')
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse()
  updateUserInformation(@Body() updateUserDTO: UpdateUserDTO): Promise<User> {
    return this.userService.updateUserInformation(updateUserDTO);
  }

  @Patch('update/avatar')
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse()
  updateUserAvatar(
    @Body() updateUserAvatarDTO: UpdateUserAvatarDTO,
  ): Promise<User> {
    return this.userService.updateUserAvatar(updateUserAvatarDTO);
  }
}
