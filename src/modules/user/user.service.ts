import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from 'src/common/interfaces/user-info.interface';
import { User } from 'src/entities/user.entity';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { UpdateUserAvatarDTO } from './dto/update-user-avatar.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async userInformation(user: User): Promise<UserInfo> {
    const { id, email, firstName, lastName, avatar } = user;
    this.logger.verbose('Successfully loaded user info');
    return { id, email, firstName, lastName, avatar };
  }

  async updateUserInformation(updateUserDTO: UpdateUserDTO): Promise<User> {
    return this.usersRepository.updateUserInformation(updateUserDTO);
  }

  async updateUserAvatar(
    updateUserAvatarDTO: UpdateUserAvatarDTO,
  ): Promise<User> {
    return this.usersRepository.updateUserAvatar(updateUserAvatarDTO);
  }

  async forgotPassword(forgotPasswordDTO: ForgotPasswordDTO): Promise<void> {
    return this.usersRepository.forgotPassword(forgotPasswordDTO);
  }

  async resetPassword(resetPasswordDTO: ResetPasswordDTO): Promise<boolean> {
    return this.usersRepository.resetPassword(resetPasswordDTO);
  }
}
