import { Location } from 'src/entities/location.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateLocationDTO } from './dto/create-location.dto';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
  async getLocations(limit?: number): Promise<Location[]> {
    const locations = this.createQueryBuilder('location')
      .select(['location.name', 'location.lat', 'location.lon'])
      .limit(limit)
      .getMany();
    return locations;
  }

  async getRandomLocation(): Promise<Location> {
    const location = this.createQueryBuilder('location')
      .select(['location.name', 'location.lat', 'location.lon'])
      .orderBy('RANDOM()')
      .getOne();

    return location;
  }

  async addLocation(createLocationDTO: CreateLocationDTO): Promise<Location> {
    const { name, lat, lon } = createLocationDTO;

    const location = this.create({
      name,
      lat,
      lon,
    });

    await this.save(location);

    return location;
  }
}
