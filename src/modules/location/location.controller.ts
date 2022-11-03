import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Location } from 'src/entities/location.entity';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/utils/types/get-user.decorator';
import { CreateLocationDTO } from './dto/create-location.dto';
import { GuessLocationDTO } from './dto/guess-location.dto';
import { LocationService } from './location.service';

@ApiTags('location')
@ApiBearerAuth()
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
  @UseGuards(AuthGuard())
  addLocation(
    @Body() createLocationDTO: CreateLocationDTO,
    @GetUser() user: User,
  ): Promise<Location> {
    return this.locationService.addLocation(createLocationDTO, user);
  }

  @Post('/guess/:id')
  @UseGuards(AuthGuard())
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
