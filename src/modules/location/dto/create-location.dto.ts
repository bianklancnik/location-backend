import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLocationDTO {
  @ApiProperty({
    description: 'Location name',
    default: 'Location 1',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Location address',
    default: 'Goriska cesta 65, 3320 Velenje, Slovenia',
  })
  @IsNotEmpty()
  address: string;

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

  @ApiProperty({ description: 'Image of the location' })
  @IsNotEmpty()
  img: string;
}
