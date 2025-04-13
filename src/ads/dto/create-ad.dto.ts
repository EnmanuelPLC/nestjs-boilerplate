import {
  // decorators here

  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateAdDto {
  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  budget: number;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
