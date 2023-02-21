import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ForgotPasswordDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  email: string;
}
