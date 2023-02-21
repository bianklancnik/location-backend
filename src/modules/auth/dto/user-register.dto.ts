import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';

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
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Password should have 1 uppercase, 1 lowercase letter along with a number and special character and be 8 characters long.',
  })
  password: string;
}
