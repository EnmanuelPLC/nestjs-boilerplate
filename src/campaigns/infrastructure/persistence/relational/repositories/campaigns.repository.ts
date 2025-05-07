import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CampaignsEntity } from '../entities/campaigns.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Campaigns } from '../../../../domain/campaigns';
import { CampaignsRepository } from '../../campaigns.repository';
import { CampaignsMapper } from '../mappers/campaigns.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class CampaignsRelationalRepository implements CampaignsRepository {
  constructor(
    @InjectRepository(CampaignsEntity)
    private readonly campaignsRepository: Repository<CampaignsEntity>,
  ) {}

  async create(data: Campaigns): Promise<Campaigns> {
    const persistenceModel = CampaignsMapper.toPersistence(data);
    const newEntity = await this.campaignsRepository.save(
      this.campaignsRepository.create(persistenceModel),
    );
    return CampaignsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Campaigns[]> {
    const entities = await this.campaignsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => CampaignsMapper.toDomain(entity));
  }

  async findById(id: Campaigns['id']): Promise<NullableType<Campaigns>> {
    const entity = await this.campaignsRepository.findOne({
      where: { id },
    });

    return entity ? CampaignsMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Campaigns['id'][]): Promise<Campaigns[]> {
    const entities = await this.campaignsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => CampaignsMapper.toDomain(entity));
  }

  async update(
    id: Campaigns['id'],
    payload: Partial<Campaigns>,
  ): Promise<Campaigns> {
    const entity = await this.campaignsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.campaignsRepository.save(
      this.campaignsRepository.create(
        CampaignsMapper.toPersistence({
          ...CampaignsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CampaignsMapper.toDomain(updatedEntity);
  }

  async remove(id: Campaigns['id']): Promise<void> {
    await this.campaignsRepository.delete(id);
  }
}
