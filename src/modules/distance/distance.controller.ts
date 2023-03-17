import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Distance } from 'src/entities/distance.entity';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/utils/types/get-user.decorator';
import { DistanceService } from './distance.service';
import { GuessLocationDTO } from './dto/guess-location.dto';

@ApiTags('distance')
@ApiBearerAuth()
@Controller('distance')
export class DistanceController {
  constructor(private distanceService: DistanceService) {}

  @Get('/:id')
  getDistancesByLocationId(
    @Param('id') locationId: number,
  ): Promise<Distance[]> {
    return this.distanceService.getDistancesByLocationId(locationId);
  }

  @Post('/:id')
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
  @UseGuards(AuthGuard())
  fetchEntryForDistance(
    @Param('id') locationId: number,
    @GetUser() user: User,
  ): Promise<number> {
    return this.distanceService.fetchEntryForDistance(locationId, user.id);
  }
}
