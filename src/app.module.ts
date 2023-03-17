import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmModuleOptions from './config/orm.config';
import { AuthModule } from './modules/auth/auth.module';
import { DistanceModule } from './modules/distance/distance.module';
import { LocationModule } from './modules/location/location.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmModuleOptions,
    }),
    AuthModule,
    LocationModule,
    UserModule,
    DistanceModule,
  ],
})
export class AppModule {}
