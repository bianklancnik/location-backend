import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { Distance } from './distance.entity';
import { Location } from './location.entity';

@Entity()
export class User extends CustomBaseEntity {
  @ApiProperty({ type: String })
  @Column({ unique: true })
  @Index()
  email: string;

  @ApiProperty({ type: String })
  @Column()
  firstName: string;

  @ApiProperty({ type: String })
  @Column()
  lastName: string;

  @ApiProperty({ type: String })
  @Column({ select: false })
  password: string;

  @ApiProperty({ type: String })
  @Column()
  avatar: string;

  @ApiPropertyOptional({ type: String })
  @Column({ nullable: true })
  @IsOptional()
  token: string;

  @ApiPropertyOptional({ type: Date })
  @Column({ nullable: true })
  @IsOptional()
  tokenExpiryDate: Date;

  @ApiProperty({ isArray: true, type: () => Location })
  @OneToMany(
    () => Location,
    location => location.user,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  locations: Location[];

  @ApiProperty({ isArray: true, type: () => Distance })
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
