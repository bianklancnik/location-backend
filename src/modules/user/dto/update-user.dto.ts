import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({ description: 'User id', type: Number })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiPropertyOptional({ description: 'User first name', type: String })
  @IsOptional()
  firstName: string;

  @ApiPropertyOptional({ description: 'User last name', type: String })
  @IsOptional()
  lastName: string;

  @ApiPropertyOptional({ description: 'User email', type: String })
  @IsOptional()
  email: string;

  @ApiPropertyOptional({ description: 'User avatar image', type: String })
  @IsOptional()
  avatar: string;

  @ApiPropertyOptional({ description: 'New password for user', type: String })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Password should have 1 uppercase, 1 lowercase letter along with a number and special character and be 8 characters long.',
  })
  newPassword: string;
}
