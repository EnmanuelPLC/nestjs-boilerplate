import { StatusDto } from '../../statuses/dto/status.dto';

import { UserDto } from '../../users/dto/user.dto';

import {
  // decorators here

  IsNumber,
  IsString,
  IsOptional,
  ValidateNested,
  IsNotEmptyObject,
  IsDate,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
  Transform,
} from 'class-transformer';

export class CreateCampaignsDto {
  @ApiProperty({
    required: true,
    type: () => StatusDto,
  })
  @ValidateNested()
  @Type(() => StatusDto)
  @IsNotEmptyObject()
  status: StatusDto;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  remainingBudget: number;

  @ApiProperty({
    required: true,
    type: () => Date,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  endsAt: Date;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startsIn?: Date;

  @ApiProperty({
    required: true,
    type: () => UserDto,
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  owner: UserDto;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  budget: number;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
