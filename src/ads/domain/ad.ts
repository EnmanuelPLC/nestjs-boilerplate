import { ApiProperty } from '@nestjs/swagger';

export class Ad {
  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  budget: number;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
