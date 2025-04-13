import { Ad } from '../../../../domain/ad';

import { AdEntity } from '../entities/ad.entity';

export class AdMapper {
  static toDomain(raw: AdEntity): Ad {
    const domainEntity = new Ad();
    domainEntity.budget = raw.budget;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Ad): AdEntity {
    const persistenceEntity = new AdEntity();
    persistenceEntity.budget = domainEntity.budget;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
