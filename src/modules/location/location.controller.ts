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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Location } from 'src/entities/location.entity';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/utils/types/get-user.decorator';
import { PaginationParams } from 'src/utils/types/pagination-params';
import { CreateLocationDTO } from './dto/create-location.dto';
import { UpdateLocationDTO } from './dto/update-location.dto';
import { LocationService } from './location.service';

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns all locations',
  })
  @ApiOkResponse({ type: Location, isArray: true })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '400. BadRequestException.',
  })
  getAllLocations(@Query() { limit }: PaginationParams): Promise<Location[]> {
    return this.locationService.getAllLocations(limit);
  }

  @Get('/random')
  @ApiOperation({
    summary: 'Returns random location',
  })
  @ApiOkResponse({ type: Location })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '400. BadRequestException.',
  })
  getRandomLocation(): Promise<Location> {
    return this.locationService.getRandomLocation();
  }

  //pagination
  @Get('/user')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Returns locations added by user',
  })
  @ApiOkResponse({ type: Location, isArray: true })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '400. BadRequestException.',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @ApiBearerAuth()
  getUserLocations(
    @GetUser() user: User,
    @Query() { limit }: PaginationParams,
  ): Promise<Location[]> {
    return this.locationService.getUserLocations(user, limit);
  }

  //get id on the end because of bug?
  @Get(':id')
  @ApiOperation({
    summary: 'Returns location by location id',
  })
  @ApiOkResponse({ type: Location })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '400. BadRequestException.',
  })
  getLocationById(@Param('id') id: number): Promise<Location> {
    return this.locationService.getLocation(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Update location',
  })
  @ApiOkResponse({ type: Location })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '400. BadRequestException.',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @ApiBearerAuth()
  updateLocation(
    @Param('id') id: number,
    @Body() updateLocationDTO: UpdateLocationDTO,
  ): Promise<Location> {
    return this.locationService.updateLocation(id, updateLocationDTO);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Delete location',
  })
  @ApiOkResponse({ description: '200. Returns nothing on successful delete' })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '400. BadRequestException.',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @ApiBearerAuth()
  deleteLocation(@Param('id') id: number): Promise<void> {
    return this.locationService.deleteLocation(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Add new location',
  })
  @ApiOkResponse({ description: '200. Returns nothing on successful add' })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '400. BadRequestException.',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @ApiBearerAuth()
  addLocation(
    @Body() createLocationDTO: CreateLocationDTO,
    @GetUser() user: User,
  ): Promise<void> {
    return this.locationService.addLocation(createLocationDTO, user);
  }
}
