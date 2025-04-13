import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { AdEntity } from '../entities/ad.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Ad } from '../../../../domain/ad';
import { AdRepository } from '../../ad.repository';
import { AdMapper } from '../mappers/ad.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class AdRelationalRepository implements AdRepository {
  constructor(
    @InjectRepository(AdEntity)
    private readonly adRepository: Repository<AdEntity>,
  ) {}

  async create(data: Ad): Promise<Ad> {
    const persistenceModel = AdMapper.toPersistence(data);
    const newEntity = await this.adRepository.save(
      this.adRepository.create(persistenceModel),
    );
    return AdMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Ad[]> {
    const entities = await this.adRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => AdMapper.toDomain(entity));
  }

  async findById(id: Ad['id']): Promise<NullableType<Ad>> {
    const entity = await this.adRepository.findOne({
      where: { id },
    });

    return entity ? AdMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Ad['id'][]): Promise<Ad[]> {
    const entities = await this.adRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => AdMapper.toDomain(entity));
  }

  async update(id: Ad['id'], payload: Partial<Ad>): Promise<Ad> {
    const entity = await this.adRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.adRepository.save(
      this.adRepository.create(
        AdMapper.toPersistence({
          ...AdMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AdMapper.toDomain(updatedEntity);
  }

  async remove(id: Ad['id']): Promise<void> {
    await this.adRepository.delete(id);
  }
}
