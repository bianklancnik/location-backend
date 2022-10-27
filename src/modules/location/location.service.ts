import { Injectable } from '@nestjs/common';
import { Location } from 'src/entities/location.entity';
import { CreateLocationDTO } from './dto/create-location.dto';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService {
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
}
