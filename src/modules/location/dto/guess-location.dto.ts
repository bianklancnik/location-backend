import { IsNotEmpty } from 'class-validator';

export class GuessLocationDTO {
  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  lon: number;
}
