import { Injectable, Logger } from '@nestjs/common';
import { Location } from 'src/entities/location.entity';
import { User } from 'src/entities/user.entity';
import { CreateLocationDTO } from './dto/create-location.dto';
import { UpdateLocationDTO } from './dto/update-location.dto';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService {
  private logger = new Logger('LocationService');
  constructor(private locationRepository: LocationRepository) {}

  async getLocations(limit?: number): Promise<Location[]> {
    return this.locationRepository.getLocations(limit);
  }

  async getLocation(id: number): Promise<Location> {
    return this.locationRepository.getLocation(id);
  }

  async deleteLocation(id: number): Promise<void> {
    return this.locationRepository.deleteLocation(id);
  }

  async updateLocation(
    id: number,
    updateLocationDTO: UpdateLocationDTO,
  ): Promise<Location> {
    return this.locationRepository.updateLocation(id, updateLocationDTO);
  }

  async getRandomLocation(): Promise<Location> {
    return this.locationRepository.getRandomLocation();
  }

  async getUserLocations(user: User): Promise<Location[]> {
    return this.locationRepository.getUserLocations(user);
  }

  async addLocation(
    createLocationDTO: CreateLocationDTO,
    user: User,
  ): Promise<void> {
    return this.locationRepository.addLocation(createLocationDTO, user);
  }
}
