import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { User } from '../../entities/user.entity';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(userRegisterDto: UserRegisterDto) {
    const { username, password } = userRegisterDto;
    const user = await this.usersRepository.findOne({ username });

    if (user) {
      throw new BadRequestException(`${username} is already taken`);
    }

    //hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const { password: pw, ...savedUser } = await this.usersRepository.save({
      username,
      password: hashedPassword,
    });

    return savedUser;
  }

  async login(user: User) {
    const payload: JwtPayloadDto = { username: user.username, sub: user.id };
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userLoginDto: UserLoginDto) {
    const { username, password } = userLoginDto;
    const user = await this.usersRepository.findOne(
      { username },
      { select: ['id', 'username', 'password'] },
    );

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Passwords does not match');
    }

    delete user.password;

    return user;
  }
}
