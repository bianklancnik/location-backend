import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { LocationRepository } from '../location/location.repository';
import { UserRepository } from '../user/user.repository';
import { DistanceController } from './distance.controller';
import { DistanceRepository } from './distance.repository';
import { DistanceService } from './distance.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      DistanceRepository,
      LocationRepository,
      UserRepository,
    ]),
  ],
  controllers: [DistanceController],
  providers: [DistanceService],
})
export class DistanceModule {}
