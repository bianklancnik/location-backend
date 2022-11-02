import { Injectable, Logger } from '@nestjs/common';
import { Location } from 'src/entities/location.entity';
import { CreateLocationDTO } from './dto/create-location.dto';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService {
  private logger = new Logger('LocationService');
  constructor(private locationRepository: LocationRepository) {}

  async getLocations(limit?: number): Promise<Location[]> {
    return this.locationRepository.getLocations(limit);
  }

  async getRandomLocation(): Promise<Location> {
    return this.locationRepository.getRandomLocation();
  }

  async addLocation(createLocationDTO: CreateLocationDTO): Promise<Location> {
    return this.locationRepository.addLocation(createLocationDTO);
  }

  async guessLocation(id: number, lat: number, lon: number): Promise<number> {
    const location = await this.locationRepository.findOne(id);

    const dist = this.calculateDistance(location.lat, location.lon, lat, lon);

    this.logger.verbose(`User successfully guessed location with id ${id}`);
    return dist;
  }

  calculateDistance(
    locationLat: number,
    locationLon: number,
    lat: number,
    lon: number,
  ): number {
    const dist = lat + lon - (locationLat + locationLon);
    return dist;
  }
}
