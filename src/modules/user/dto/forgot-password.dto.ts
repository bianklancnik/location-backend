import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ForgotPasswordDTO {
  @ApiProperty({ type: String, description: 'User email' })
  @IsNotEmpty()
  email: string;
}
