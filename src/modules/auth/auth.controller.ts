import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    const user = await this.authService.validateUser(userLoginDto);
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto) {
    return this.authService.register(userRegisterDto);
  }
}
