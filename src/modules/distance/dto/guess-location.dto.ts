import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GuessLocationDTO {
  @ApiProperty({
    description: 'Location lantitude',
    default: 20,
  })
  @IsNotEmpty()
  lat: number;

  @ApiProperty({
    description: 'Location longitude',
    default: 70,
  })
  @IsNotEmpty()
  lon: number;
}
