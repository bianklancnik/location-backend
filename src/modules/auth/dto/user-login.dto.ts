import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    description: 'User login name',
    default: 'user.name@gmail.com',
  })
  @IsString()
  @MinLength(4)
  email: string;

  @ApiProperty({
    description: 'User password',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
