import { StatusesService } from '../statuses/statuses.service';
import { Status } from '../statuses/domain/status';

import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCampaignsDto } from './dto/create-campaigns.dto';
import { UpdateCampaignsDto } from './dto/update-campaigns.dto';
import { CampaignsRepository } from './infrastructure/persistence/campaigns.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Campaigns } from './domain/campaigns';

@Injectable()
export class CampaignsService {
  constructor(
    private readonly statusService: StatusesService,

    private readonly usersService: UsersService,

    // Dependencies here
    private readonly campaignsRepository: CampaignsRepository,
  ) {}

  async create(createCampaignsDto: CreateCampaignsDto) {
    // Do not remove comment below.
    // <creating-property />
    const statusObject = await this.statusService.findById(
      createCampaignsDto.status.id,
    );
    if (!statusObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          status: 'notExists',
        },
      });
    }
    const status = statusObject;

    const ownerObject = await this.usersService.findById(
      createCampaignsDto.owner.id,
    );
    if (!ownerObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          owner: 'notExists',
        },
      });
    }
    const owner = ownerObject;

    return this.campaignsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      status,

      remainingBudget: createCampaignsDto.remainingBudget,

      endsAt: createCampaignsDto.endsAt,

      startsIn: createCampaignsDto.startsIn,

      owner,

      description: createCampaignsDto.description,

      title: createCampaignsDto.title,

      budget: createCampaignsDto.budget,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.campaignsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Campaigns['id']) {
    return this.campaignsRepository.findById(id);
  }

  findByIds(ids: Campaigns['id'][]) {
    return this.campaignsRepository.findByIds(ids);
  }

  async update(
    id: Campaigns['id'],

    updateCampaignsDto: UpdateCampaignsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let status: Status | undefined = undefined;

    if (updateCampaignsDto.status) {
      const statusObject = await this.statusService.findById(
        updateCampaignsDto.status.id,
      );
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'notExists',
          },
        });
      }
      status = statusObject;
    }

    let owner: User | undefined = undefined;

    if (updateCampaignsDto.owner) {
      const ownerObject = await this.usersService.findById(
        updateCampaignsDto.owner.id,
      );
      if (!ownerObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            owner: 'notExists',
          },
        });
      }
      owner = ownerObject;
    }

    return this.campaignsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      status,

      remainingBudget: updateCampaignsDto.remainingBudget,

      endsAt: updateCampaignsDto.endsAt,

      startsIn: updateCampaignsDto.startsIn,

      owner,

      description: updateCampaignsDto.description,

      title: updateCampaignsDto.title,

      budget: updateCampaignsDto.budget,
    });
  }

  remove(id: Campaigns['id']) {
    return this.campaignsRepository.remove(id);
  }
}
