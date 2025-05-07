import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Campaigns } from '../../domain/campaigns';

export abstract class CampaignsRepository {
  abstract create(
    data: Omit<Campaigns, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Campaigns>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Campaigns[]>;

  abstract findById(id: Campaigns['id']): Promise<NullableType<Campaigns>>;

  abstract findByIds(ids: Campaigns['id'][]): Promise<Campaigns[]>;

  abstract update(
    id: Campaigns['id'],
    payload: DeepPartial<Campaigns>,
  ): Promise<Campaigns | null>;

  abstract remove(id: Campaigns['id']): Promise<void>;
}
