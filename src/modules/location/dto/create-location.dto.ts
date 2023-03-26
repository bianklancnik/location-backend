import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLocationDTO {
  @ApiProperty({
    description: 'Location address',
    default: 'Goriska cesta 65, 3320 Velenje, Slovenia',
    type: String,
  })
  @IsNotEmpty()
  address: string;

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

  @ApiProperty({ description: 'Image of the location', type: String })
  @IsNotEmpty()
  img: string;
}
