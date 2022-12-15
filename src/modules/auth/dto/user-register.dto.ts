import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UserRegisterDto {
  @ApiProperty({
    description: 'User email',
    default: 'bian.klancnik@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User name',
    default: 'Bian',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'User surname',
    default: 'Klančnik',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'User password',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
