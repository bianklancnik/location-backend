import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Location } from 'src/entities/location.entity';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/utils/types/get-user.decorator';
import { CreateLocationDTO } from './dto/create-location.dto';
import { GuessLocationDTO } from './dto/guess-location.dto';
import { UpdateLocationDTO } from './dto/update-location.dto';
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

  @Get('/user')
  @UseGuards(AuthGuard())
  getUserLocations(@GetUser() user: User): Promise<Location[]> {
    return this.locationService.getUserLocations(user);
  }

  //get id on the end because of bug?
  @Get(':id')
  getLocationById(@Param('id') id: number): Promise<Location> {
    return this.locationService.getLocation(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  updateLocation(
    @Param('id') id: number,
    @Body() updateLocationDTO: UpdateLocationDTO,
  ): Promise<Location> {
    return this.locationService.updateLocation(id, updateLocationDTO);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteLocation(@Param('id') id: number): Promise<void> {
    return this.locationService.deleteLocation(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  addLocation(
    @Body() createLocationDTO: CreateLocationDTO,
    @GetUser() user: User,
  ): Promise<void> {
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
