import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { Distance } from './distance.entity';
import { User } from './user.entity';

@Entity()
export class Location extends CustomBaseEntity {
  @ApiProperty({ type: String })
  @Column()
  address: string;

  @ApiProperty({ type: String })
  @Column()
  img: string;

  @ApiProperty({ type: Number })
  @Column({ type: 'decimal', precision: 16, scale: 14, default: 0 })
  lat: number;

  @ApiProperty({ type: Number })
  @Column({ type: 'decimal', precision: 16, scale: 14, default: 0 })
  lon: number;

  @ApiProperty({ isArray: true, type: () => Distance })
  @OneToMany(
    () => Distance,
    distance => distance.location,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  distances: Distance[];

  @ApiProperty({ isArray: true, type: () => User })
  @ManyToOne(
    () => User,
    user => user.locations,
    {
      eager: false,
      onDelete: 'CASCADE',
    },
  )
  user: User;
}
