import { Location } from 'src/entities/location.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateLocationDTO } from './dto/create-location.dto';
import { Logger, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UpdateLocationDTO } from './dto/update-location.dto';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
  private logger = new Logger('LocationRepository');
  async getLocations(limit?: number): Promise<Location[]> {
    const locations = await this.createQueryBuilder('location')
      .select([
        'location.address',
        'location.lat',
        'location.lon',
        'location.img',
      ])
      .limit(limit)
      .getMany();

    this.logger.verbose('Successfully loaded all locations');
    return locations;
  }

  async getLocation(id: number): Promise<Location> {
    const location = await this.findOneOrFail(id);
    this.logger.verbose(`Loaded location with id ${id}`);
    return location;
  }

  async deleteLocation(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Quote with ID ${id} not found`);
    this.logger.verbose(`Deleted location with id ${id}`);
  }

  async updateLocation(
    id: number,
    updateLocationDTO: UpdateLocationDTO,
  ): Promise<Location> {
    const location = await this.getLocation(id);
    const { img } = updateLocationDTO;
    location.img = img;
    await this.save(location);
    this.logger.verbose(`Updated location with id ${id}`);
    return location;
  }

  async getRandomLocation(): Promise<Location> {
    const location = await this.createQueryBuilder('location')
      .select([
        'location.address',
        'location.lat',
        'location.lon',
        'location.img',
      ])
      .orderBy('RANDOM()')
      .getOne();

    this.logger.verbose('Successfully loaded random location');
    return location;
  }

  async getUserLocations(user: User): Promise<Location[]> {
    const locations = await this.createQueryBuilder('location')
      .select([
        'location.id',
        'location.address',
        'location.lat',
        'location.lon',
        'location.img',
      ])
      .innerJoin('location.user', 'user')
      .where('user.id = :uid')
      .setParameter('uid', user.id)
      .getMany();
    this.logger.verbose(
      `Successfully loaded locations from user ${user.email}`,
    );
    return locations;
  }

  async addLocation(
    createLocationDTO: CreateLocationDTO,
    user: User,
  ): Promise<void> {
    const { address, lat, lon, img } = createLocationDTO;

    const location = await this.create({
      address,
      lat,
      lon,
      img,
      user,
    });

    await this.save(location);

    this.logger.verbose('Successfully added location');
  }
}
