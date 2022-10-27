import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from './base.entity';

@Entity()
export class Location extends CustomBaseEntity {
  @Column()
  name: string;

  @Column()
  lat: string;

  @Column()
  lon: string;
}
