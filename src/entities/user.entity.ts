import { Column, Entity, Index } from 'typeorm';
import { CustomBaseEntity } from './base.entity';

@Entity()
export class User extends CustomBaseEntity {
  @Column({ unique: true })
  @Index()
  username: string;

  @Column({ select: false })
  password: string;
}
