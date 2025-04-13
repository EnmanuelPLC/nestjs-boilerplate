import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { AdRepository } from './infrastructure/persistence/ad.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Ad } from './domain/ad';

@Injectable()
export class AdsService {
  constructor(
    // Dependencies here
    private readonly adRepository: AdRepository,
  ) {}

  async create(createAdDto: CreateAdDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.adRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      budget: createAdDto.budget,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.adRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Ad['id']) {
    return this.adRepository.findById(id);
  }

  findByIds(ids: Ad['id'][]) {
    return this.adRepository.findByIds(ids);
  }

  async update(
    id: Ad['id'],

    updateAdDto: UpdateAdDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.adRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      budget: updateAdDto.budget,
    });
  }

  remove(id: Ad['id']) {
    return this.adRepository.remove(id);
  }
}
