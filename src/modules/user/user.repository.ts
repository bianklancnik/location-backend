import { BadRequestException, Logger } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private logger = new Logger('UserRepository');
  async updateUserInformation(updateUserDTO: UpdateUserDTO): Promise<User> {
    try {
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

      return this.save(user);
    } catch (err) {
      throw new BadRequestException(
        `Update for user with id ${updateUserDTO.id} failed`,
      );
    } finally {
      this.logger.log(
        `Updating user information for user with id ${updateUserDTO.id}`,
      );
    }
  }
}
