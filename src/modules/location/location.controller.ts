import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Location } from 'src/entities/location.entity';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/utils/types/get-user.decorator';
import { PaginationParams } from 'src/utils/types/pagination-params';
import { CreateLocationDTO } from './dto/create-location.dto';
import { UpdateLocationDTO } from './dto/update-location.dto';
import { LocationService } from './location.service';

@ApiTags('location')
@ApiBearerAuth()
@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  getLocations(@Query() { limit }: PaginationParams): Promise<Location[]> {
    return this.locationService.getLocations(limit);
  }

  @Get('/random')
  getRandomLocation(): Promise<Location> {
    return this.locationService.getRandomLocation();
  }

  //pagination
  @Get('/user')
  @UseGuards(AuthGuard())
  getUserLocations(
    @GetUser() user: User,
    @Query() { limit }: PaginationParams,
  ): Promise<Location[]> {
    return this.locationService.getUserLocations(user, limit);
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
}
