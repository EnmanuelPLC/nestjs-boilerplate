import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';

import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'campaigns',
})
export class CampaignsEntity extends EntityRelationalHelper {
  @ManyToOne(() => StatusEntity, { eager: true, nullable: false })
  status: StatusEntity;

  @Column({
    nullable: false,
    type: Number,
  })
  remainingBudget: number;

  @Column({
    nullable: false,
    type: Date,
  })
  endsAt: Date;

  @Column({
    nullable: false,
    type: Date,
  })
  startsIn?: Date;
  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  owner: UserEntity;

  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  title: string;

  @Column({
    nullable: false,
    type: Number,
  })
  budget: number;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
