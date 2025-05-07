import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CampaignsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
