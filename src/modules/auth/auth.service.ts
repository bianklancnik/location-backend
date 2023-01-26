import {
  BadRequestException,
  Injectable,
  Logger,
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
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(userRegisterDto: UserRegisterDto) {
    const { email, firstName, lastName, password } = userRegisterDto;
    const user = await this.usersRepository.findOne({ email });

    if (user) {
      throw new BadRequestException(`${email} is already taken`);
    }

    //hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const { password: pw, ...savedUser } = await this.usersRepository.save({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      avatar: '',
    });

    this.logger.verbose('User successfully registered');
    return savedUser;
  }

  async login(user: User) {
    const payload: JwtPayloadDto = { username: user.email, sub: user.id };
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;
    const user = await this.usersRepository.findOne(
      { email },
      { select: ['id', 'email', 'password'] },
    );

    if (!user) {
      throw new NotFoundException(`User with username ${email} not found`);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Passwords do not match');
    }

    delete user.password;

    this.logger.verbose('User successfully validated');
    return user;
  }
}
