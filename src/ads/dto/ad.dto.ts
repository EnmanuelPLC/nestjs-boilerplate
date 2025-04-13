import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
