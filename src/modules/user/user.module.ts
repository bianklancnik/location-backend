import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { LocationRepository } from 'src/modules/location/location.repository';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([LocationRepository, UserRepository]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
