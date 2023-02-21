import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;
}
