import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  avatar: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Password should have 1 uppercase, 1 lowercase letter along with a number and special character and be 8 characters long.',
  })
  newPassword: string;
}
