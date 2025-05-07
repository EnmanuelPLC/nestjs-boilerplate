import { Status } from '../../statuses/domain/status';
import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Campaigns {
  @ApiProperty({
    type: () => Status,
    nullable: false,
  })
  status: Status;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  remainingBudget: number;

  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  endsAt: Date;

  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  startsIn?: Date;

  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  updatedAt: Date;

  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  createdAt: Date;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  owner: User;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  title: string;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  budget: number;

  @ApiProperty({
    type: String,
  })
  id: string;
}
