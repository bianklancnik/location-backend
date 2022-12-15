import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from 'src/common/interfaces/user-info.interface';
import { User } from 'src/entities/user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async userInformation(user: User): Promise<UserInfo> {
    const { id, email, firstName, lastName } = user;
    this.logger.verbose('Successfully loaded user info');
    return { id, email, firstName, lastName };
  }
}
