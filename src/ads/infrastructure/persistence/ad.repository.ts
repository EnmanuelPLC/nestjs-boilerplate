import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Ad } from '../../domain/ad';

export abstract class AdRepository {
  abstract create(
    data: Omit<Ad, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Ad>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Ad[]>;

  abstract findById(id: Ad['id']): Promise<NullableType<Ad>>;

  abstract findByIds(ids: Ad['id'][]): Promise<Ad[]>;

  abstract update(id: Ad['id'], payload: DeepPartial<Ad>): Promise<Ad | null>;

  abstract remove(id: Ad['id']): Promise<void>;
}
