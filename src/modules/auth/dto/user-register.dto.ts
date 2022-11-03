import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UserRegisterDto {
  @ApiProperty({
    description: 'User login name',
    default: 'user1',
  })
  @IsString()
  @MinLength(4)
  username: string;

  @ApiProperty({
    description: 'User email',
    default: 'bian.klancnik@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User password',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
