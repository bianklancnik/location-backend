import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDTO {
  @ApiProperty({ type: String, description: 'User email' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, description: 'User authentication token' })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ type: String, description: 'User password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Password should have 1 uppercase, 1 lowercase letter along with a number and special character and be 8 characters long.',
  })
  password: string;
}
