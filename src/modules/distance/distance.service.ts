import { Injectable, Logger } from '@nestjs/common';
import { Distance } from 'src/entities/distance.entity';
import { User } from 'src/entities/user.entity';
import { LocationRepository } from '../location/location.repository';
import { DistanceRepository } from './distance.repository';

@Injectable()
export class DistanceService {
  private logger = new Logger('LocationService');
  constructor(
    private distanceRepository: DistanceRepository,
    private locationRepository: LocationRepository,
  ) {}

  async getDistancesByLocationId(locationId: number): Promise<Distance[]> {
    return this.distanceRepository.getDistancesByLocationId(locationId);
  }

  async getUserBestGuesses(user: User): Promise<Distance[]> {
    return this.distanceRepository.getUserBestGuesses(user);
  }

  async guessLocation(
    locationId: number,
    user: User,
    lat: number,
    lon: number,
  ): Promise<number> {
    const location = await this.locationRepository.findOne(locationId);

    this.logger.log('Calculating distance error');
    const dist = this.calculateDistance(location.lat, location.lon, lat, lon);

    const distance = this.distanceRepository.create({
      distance: dist,
      user,
      location,
    });

    await this.distanceRepository.save(distance);

    this.logger.verbose(
      `User with id ${user.id} successfully guessed distance for location with id ${locationId}. Returning distance error in kilometers`,
    );
    return dist;
  }

  async fetchEntryForDistance(
    locationId: number,
    userId: number,
  ): Promise<number> {
    return this.distanceRepository.fetchEntryForDistance(locationId, userId);
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
