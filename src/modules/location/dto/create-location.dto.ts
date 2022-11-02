import { IsNotEmpty } from 'class-validator';

export class CreateLocationDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  lon: number;

  @IsNotEmpty()
  img: string;
}
