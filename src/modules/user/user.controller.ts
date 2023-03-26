import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserInfo } from 'src/common/interfaces/user-info.interface';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/utils/types/get-user.decorator';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { UpdateUserAvatarDTO } from './dto/update-user-avatar.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Returns all data for user',
  })
  @ApiOkResponse({ type: User, isArray: true })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '400. BadRequestException.',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @ApiBearerAuth()
  userInformation(@GetUser() user: User): Promise<UserInfo> {
    return this.userService.userInformation(user);
  }

  @Patch('update')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Updates user data',
  })
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '400. BadRequestException.',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @ApiBearerAuth()
  updateUserInformation(@Body() updateUserDTO: UpdateUserDTO): Promise<User> {
    return this.userService.updateUserInformation(updateUserDTO);
  }

  @Patch('update/avatar')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Updates user avatar image',
  })
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '400. BadRequestException.',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @ApiBearerAuth()
  updateUserAvatar(
    @Body() updateUserAvatarDTO: UpdateUserAvatarDTO,
  ): Promise<User> {
    return this.userService.updateUserAvatar(updateUserAvatarDTO);
  }

  @Post('password/forgot')
  @ApiOperation({
    summary: 'Sends forgot password token to users email',
  })
  @ApiOkResponse({
    description: '200. Returns nothing on successful call.',
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '400. BadRequestException.',
  })
  forgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDTO): Promise<void> {
    return this.userService.forgotPassword(forgotPasswordDTO);
  }

  @Post('password/reset')
  @ApiOperation({
    summary: 'Resets user password with token from email and new password',
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      example: {
        response: 'boolean',
      },
    },
    description:
      '200. True: Password reset was successful. False: Password reset failed.',
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '400. BadRequestException.',
  })
  resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO): Promise<boolean> {
    return this.userService.resetPassword(resetPasswordDTO);
  }
}
