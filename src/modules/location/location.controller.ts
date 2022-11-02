import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { Location } from 'src/entities/location.entity';
import { CreateLocationDTO } from './dto/create-location.dto';
import { GuessLocationDTO } from './dto/guess-location.dto';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  getLocations(@Query() { limit }): Promise<Location[]> {
    return this.locationService.getLocations(limit);
  }

  @Get('/random')
  getRandomLocation(): Promise<Location> {
    return this.locationService.getRandomLocation();
  }

  @Post()
  addLocation(@Body() createLocationDTO: CreateLocationDTO): Promise<Location> {
    return this.locationService.addLocation(createLocationDTO);
  }

  @Post('/guess/:id')
  guessLocation(
    @Param('id') id: number,
    @Body() guessLocationDTO: GuessLocationDTO,
  ): Promise<number> {
    return this.locationService.guessLocation(
      id,
      guessLocationDTO.lat,
      guessLocationDTO.lon,
    );
  }
}
