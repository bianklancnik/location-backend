import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { Location } from './location.entity';
import { User } from './user.entity';

@Entity()
export class Distance extends CustomBaseEntity {
  @ApiProperty({ type: Number })
  @Column({ type: 'decimal', precision: 10, scale: 3, default: 0 })
  distance: number;

  @ApiProperty({ isArray: true, type: () => User })
  @ManyToOne(
    () => User,
    user => user.distances,
    {
      eager: false,
      onDelete: 'CASCADE',
    },
  )
  user: User;

  @ApiProperty({ isArray: true, type: () => Location })
  @ManyToOne(
    () => Location,
    location => location.distances,
    {
      eager: false,
      onDelete: 'CASCADE',
    },
  )
  location: Location;
}
