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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const user = await this.usersRepository.findOne({ username });

    if (user) {
      throw new BadRequestException(`${username} is already taken`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
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

  async validateUser(username: string, password: string) {
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
