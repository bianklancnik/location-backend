import { BadRequestException, Logger } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserAvatarDTO } from './dto/update-user-avatar.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private logger = new Logger('UserRepository');
  async updateUserInformation(updateUserDTO: UpdateUserDTO): Promise<User> {
    try {
      this.logger.log(
        `Updating user information for user with id ${updateUserDTO.id}`,
      );
      const user = await this.findOneOrFail(updateUserDTO.id);

      if (updateUserDTO.newPassword) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(
          updateUserDTO.newPassword,
          salt,
        );
        user.password = hashedPassword;
      }

      if (updateUserDTO.firstName) {
        user.firstName = updateUserDTO.firstName;
      }
      if (updateUserDTO.lastName) {
        user.lastName = updateUserDTO.lastName;
      }
      if (updateUserDTO.email) {
        user.email = updateUserDTO.email;
      }
      if (updateUserDTO.avatar) {
        user.avatar = updateUserDTO.avatar;
      }

      return this.save(user);
    } catch (err) {
      throw new BadRequestException(
        `Update for user with id ${updateUserDTO.id} failed`,
      );
    } finally {
      this.logger.verbose('Successfully updated user info');
    }
  }

  async updateUserAvatar(
    updateUserAvatarDTO: UpdateUserAvatarDTO,
  ): Promise<User> {
    try {
      this.logger.log(
        `Updating user avatar for user with id ${updateUserAvatarDTO.id}`,
      );
      const user = await this.findOneOrFail(updateUserAvatarDTO.id);

      if (updateUserAvatarDTO.avatar) {
        user.avatar = updateUserAvatarDTO.avatar;
      }

      return this.save(user);
    } catch (err) {
      throw new BadRequestException(
        `Update for user with id ${updateUserAvatarDTO.id} failed`,
      );
    } finally {
      this.logger.verbose('Successfully updated user avatar');
    }
  }
}
