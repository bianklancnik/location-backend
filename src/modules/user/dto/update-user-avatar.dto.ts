import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserAvatarDTO {
  @ApiProperty({ type: Number, description: 'User id' })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiPropertyOptional({ description: 'User avatar image' })
  @IsOptional()
  avatar: string;
}
