import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GuessLocationDTO {
  @ApiProperty({
    description: 'Location lantitude',
    default: 20,
    type: Number,
  })
  @IsNotEmpty()
  lat: number;

  @ApiProperty({
    description: 'Location longitude',
    default: 70,
    type: Number,
  })
  @IsNotEmpty()
  lon: number;
}
