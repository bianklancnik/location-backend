import { Column, Entity, Index, OneToMany } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { Location } from './location.entity';

@Entity()
export class User extends CustomBaseEntity {
  @Column({ unique: true })
  @Index()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ select: false })
  password: string;

  @OneToMany(
    () => Location,
    location => location.user,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  locations: Location[];
}
