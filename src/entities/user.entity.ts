import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { Distance } from './distance.entity';
import { Location } from './location.entity';

@Entity()
export class User extends CustomBaseEntity {
  @ApiProperty()
  @Column({ unique: true })
  @Index()
  email: string;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @ApiProperty()
  @Column({ select: false })
  password: string;

  @ApiProperty()
  @Column()
  avatar: string;

  @Column({ nullable: true })
  @IsOptional()
  token: string;

  @Column({ nullable: true })
  @IsOptional()
  tokenExpiryDate: Date;

  @ApiProperty({ isArray: true })
  @OneToMany(
    () => Location,
    location => location.user,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  locations: Location[];

  @ApiProperty({ isArray: true })
  @OneToMany(
    () => Distance,
    distance => distance.user,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  distances: Distance[];
}
