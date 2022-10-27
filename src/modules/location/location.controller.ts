import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { Location } from 'src/entities/location.entity';
import { CreateLocationDTO } from './dto/create-location.dto';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  getLocations(@Query() { limit }): Promise<Location[]> {
    return this.locationService.getLocations(limit);
  }

  @Post()
  addLocation(@Body() createLocationDTO: CreateLocationDTO): Promise<Location> {
    return this.locationService.addLocation(createLocationDTO);
  }
}
