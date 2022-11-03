import { Injectable, Logger } from '@nestjs/common';
import { Location } from 'src/entities/location.entity';
import { User } from 'src/entities/user.entity';
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

  async addLocation(
    createLocationDTO: CreateLocationDTO,
    user: User,
  ): Promise<Location> {
    return this.locationRepository.addLocation(createLocationDTO, user);
  }

  async guessLocation(id: number, lat: number, lon: number): Promise<number> {
    const location = await this.locationRepository.findOne(id);

    const dist = this.calculateDistance(location.lat, location.lon, lat, lon);

    this.logger.verbose(`User successfully guessed location with id ${id}`);
    return dist;
  }

  //Help function for calculating air distance between two locations (usign lantitude and longitude)
  calculateDistance(
    locationLat: number,
    locationLon: number,
    lat: number,
    lon: number,
  ): number {
    const R = 6371; //km
    const latDiff = this.deg2rad(locationLat - lat);
    const lonDiff = this.deg2rad(locationLon - lon);
    const a =
      Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
      Math.cos(this.deg2rad(lat)) *
        Math.cos(this.deg2rad(locationLat)) *
        Math.sin(lonDiff / 2) *
        Math.sin(lonDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c; // Distance in km
    return +dist.toFixed(3);
  }

  //Converts degrees to radians
  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
