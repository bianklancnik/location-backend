import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User login',
  })
  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '400. BadRequestException.',
  })
  async login(@Body() userLoginDto: UserLoginDto) {
    const user = await this.authService.validateUser(userLoginDto);
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({
    summary: 'User registration',
  })
  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '400. BadRequestException.',
  })
  async register(@Body() userRegisterDto: UserRegisterDto) {
    return this.authService.register(userRegisterDto);
  }
}
