import { BadRequestException, Logger } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserAvatarDTO } from './dto/update-user-avatar.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import nodemailer = require('nodemailer');
import { ResetPasswordDTO } from './dto/reset-password.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
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

      return await this.save(user);
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

      return await this.save(user);
    } catch (err) {
      throw new BadRequestException(
        `Update for user with id ${updateUserAvatarDTO.id} failed`,
      );
    } finally {
      this.logger.verbose('Successfully updated user avatar');
    }
  }

  async forgotPassword(forgotPasswordDTO: ForgotPasswordDTO): Promise<void> {
    const { email } = forgotPasswordDTO;
    this.logger.log(`Checking if email ${email} exists`);
    const user = await this.findOneOrFail({ email });
    if (user) {
      const transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER, // generated ethereal user
          pass: process.env.SMTP_PASSWORD, // generated ethereal password
        },
      });

      const token = Math.random()
        .toString(32)
        .slice(2, 12);
      const currentDate = new Date();
      const expirationDate = new Date(currentDate.getTime() + 15 * 60000);
      user.token = token;
      user.tokenExpiryDate = expirationDate;
      await this.save(user);

      const info = await transporter.sendMail({
        from: '"Geotagger" <geotaggerteam@geotagger.com>', // sender address
        to: `${email}`, // list of receivers
        subject: 'Password reset token', // Subject line
        text: 'Hello! Here is your password reset token:', // plain text body
        html: `<h3>Hello!</h3><p>Here is your password reset token: <b>${token}</b></p><p>It expires in 15 minutes.</p>`, // html body
      });
    }
    this.logger.verbose('Reset password email sent to user');
  }

  async resetPassword(resetPasswordDTO: ResetPasswordDTO): Promise<boolean> {
    const { email, token, password } = resetPasswordDTO;
    this.logger.log(`Reseting user password`);
    const user = await this.findOneOrFail({ email });
    const currentTime = new Date();
    if (token === user.token && currentTime <= user.tokenExpiryDate) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      await this.save(user);
      this.logger.verbose(`Password for user ${email} succesfully reseted`);
      return true;
    } else {
      return false;
    }
  }
}
