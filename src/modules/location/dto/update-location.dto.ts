import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateLocationDTO {
  @ApiProperty({
    description: 'Image of the location',
    type: String,
  })
  @IsNotEmpty()
  img: string;
}
