import { Column, Entity, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Location extends CustomBaseEntity {
  @Column()
  name: string;

  @Column()
  lat: string;

  @Column()
  lon: string;

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
