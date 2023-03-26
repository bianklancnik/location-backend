import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Distance } from 'src/entities/distance.entity';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/utils/types/get-user.decorator';
import { PaginationParams } from 'src/utils/types/pagination-params';
import { DistanceService } from './distance.service';
import { GuessLocationDTO } from './dto/guess-location.dto';

@ApiTags('distance')
@ApiBearerAuth()
@Controller('distance')
export class DistanceController {
  constructor(private distanceService: DistanceService) {}

  @Get('/user/best')
  @ApiOperation({
    summary: 'Returns users best guesses in order from best to worst',
  })
  @ApiOkResponse({ type: Distance, isArray: true })
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
  @UseGuards(AuthGuard())
  getUserBestGuesses(
    @GetUser() user: User,
    @Query() { limit }: PaginationParams,
  ): Promise<Distance[]> {
    return this.distanceService.getUserBestGuesses(user, limit);
  }

  @Get('/:id')
  @ApiOperation({
    summary:
      'Returns distances for specific location, searching by location id',
  })
  @ApiOkResponse({ type: Distance, isArray: true })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '400. BadRequestException.',
  })
  getDistancesForLocation(
    @Param('id') locationId: number,
  ): Promise<Distance[]> {
    return this.distanceService.getDistancesByLocationId(locationId);
  }

  @Post('/:id')
  @ApiOperation({
    summary: 'Saves data for location that user guessed, saving by location id',
  })
  @ApiOkResponse({ type: Number })
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
  @UseGuards(AuthGuard())
  guessLocation(
    @Param('id') locationId: number,
    @Body() guessLocationDTO: GuessLocationDTO,
    @GetUser() user: User,
  ): Promise<number> {
    return this.distanceService.guessLocation(
      locationId,
      user,
      guessLocationDTO.lat,
      guessLocationDTO.lon,
    );
  }

  //fetches entry from database if user already guessed this location
  @Get('/user/:id')
  @ApiOperation({
    summary:
      'Checks (with location id) if user already guessed this location, by fetching location entry from database',
  })
  @ApiOkResponse({ type: Number })
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
  @UseGuards(AuthGuard())
  fetchEntryForDistance(
    @Param('id') locationId: number,
    @GetUser() user: User,
  ): Promise<number> {
    return this.distanceService.fetchEntryForDistance(locationId, user.id);
  }
}
