import { Location } from 'src/entities/location.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateLocationDTO } from './dto/create-location.dto';
import { Logger } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
  private logger = new Logger('LocationRepository');
  async getLocations(limit?: number): Promise<Location[]> {
    const locations = this.createQueryBuilder('location')
      .select([
        'location.name',
        'location.address',
        'location.lat',
        'location.lon',
      ])
      .limit(limit)
      .getMany();

    this.logger.verbose('Successfully loaded all locations');
    return locations;
  }

  async getRandomLocation(): Promise<Location> {
    const location = this.createQueryBuilder('location')
      .select([
        'location.name',
        'location.address',
        'location.lat',
        'location.lon',
      ])
      .orderBy('RANDOM()')
      .getOne();

    this.logger.verbose('Successfully loaded random location');
    return location;
  }

  async addLocation(
    createLocationDTO: CreateLocationDTO,
    user: User,
  ): Promise<Location> {
    const { name, address, lat, lon, img } = createLocationDTO;

    const location = this.create({
      name,
      address,
      lat,
      lon,
      img,
      user,
    });

    await this.save(location);

    this.logger.verbose('Successfully added location');
    return location;
  }
}
