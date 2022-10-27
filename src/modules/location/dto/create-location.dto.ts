import { IsNotEmpty } from 'class-validator';

export class CreateLocationDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lat: string;

  @IsNotEmpty()
  lon: string;
}
