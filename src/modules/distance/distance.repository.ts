import { Logger } from '@nestjs/common';
import { Distance } from 'src/entities/distance.entity';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Distance)
export class DistanceRepository extends Repository<Distance> {
  private logger = new Logger('DistanceRepository');

  async getDistancesByLocationId(locationId: number): Promise<Distance[]> {
    this.logger.log(`Selecting all guesses for location with id ${locationId}`);
    const distances = await this.createQueryBuilder('distance')
      .select([
        'distance.distance',
        'distance.createdAt',
        'user.firstName',
        'user.lastName',
        'user.avatar',
      ])
      .innerJoin('distance.location', 'location')
      .innerJoin('distance.user', 'user')
      .where('location.id = :lid')
      .setParameter('lid', locationId)
      .orderBy('distance.distance', 'ASC')
      .getMany();
    return distances;
  }

  async getUserBestGuesses(user: User): Promise<Distance[]> {
    const locations = await this.createQueryBuilder('distance')
      .select(['distance.distance', 'location.id', 'location.img'])
      .innerJoin('distance.location', 'location')
      .innerJoin('distance.user', 'user')
      .where('user.id = :uid')
      .setParameter('uid', user.id)
      .orderBy('distance.distance', 'ASC')
      .getMany();
    this.logger.verbose(
      `Successfully loaded best guesses from user ${user.email}`,
    );
    return locations;
  }

  async fetchEntryForDistance(
    locationId: number,
    userId: number,
  ): Promise<number> {
    this.logger.log(
      `Fetching distance for user with id ${userId} and location with id ${locationId}`,
    );
    const distance = await this.createQueryBuilder('distance')
      .innerJoin('distance.user', 'user')
      .innerJoin('distance.location', 'location')
      .where('user.id = :uid')
      .andWhere('location.id = :lid')
      .setParameter('uid', userId)
      .setParameter('lid', locationId)
      .getOne();

    if (distance) {
      this.logger.verbose('Location already guessed by user');
      return distance.distance;
    }
    this.logger.verbose('Location has not been guessed by user');
    return -1;
  }
}
