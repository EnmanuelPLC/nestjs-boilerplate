import { Campaigns } from '../../../../domain/campaigns';
import { StatusMapper } from '../../../../../statuses/infrastructure/persistence/relational/mappers/status.mapper';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { CampaignsEntity } from '../entities/campaigns.entity';

export class CampaignsMapper {
  static toDomain(raw: CampaignsEntity): Campaigns {
    const domainEntity = new Campaigns();
    if (raw.status) {
      domainEntity.status = StatusMapper.toDomain(raw.status);
    }

    domainEntity.remainingBudget = raw.remainingBudget;

    domainEntity.endsAt = raw.endsAt;

    domainEntity.startsIn = raw.startsIn;

    domainEntity.updatedAt = raw.updatedAt;

    domainEntity.createdAt = raw.createdAt;

    if (raw.owner) {
      domainEntity.owner = UserMapper.toDomain(raw.owner);
    }

    domainEntity.description = raw.description;

    domainEntity.title = raw.title;

    domainEntity.budget = raw.budget;

    domainEntity.id = raw.id;

    return domainEntity;
  }

  static toPersistence(domainEntity: Campaigns): CampaignsEntity {
    const persistenceEntity = new CampaignsEntity();
    if (domainEntity.status) {
      persistenceEntity.status = StatusMapper.toPersistence(
        domainEntity.status,
      );
    }

    persistenceEntity.remainingBudget = domainEntity.remainingBudget;

    persistenceEntity.endsAt = domainEntity.endsAt;

    persistenceEntity.startsIn = domainEntity.startsIn;

    if (domainEntity.owner) {
      persistenceEntity.owner = UserMapper.toPersistence(domainEntity.owner);
    }

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.title = domainEntity.title;

    persistenceEntity.budget = domainEntity.budget;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
