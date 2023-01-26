import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Location extends CustomBaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column()
  img: string;

  @ApiProperty()
  @Column()
  lat: number;

  @ApiProperty()
  @Column()
  lon: number;

  @ApiProperty({ isArray: true })
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
