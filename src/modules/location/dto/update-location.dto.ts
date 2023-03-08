import { IsNotEmpty } from 'class-validator';

export class UpdateLocationDTO {
  @IsNotEmpty()
  img: string;
}
