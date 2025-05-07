import { Module } from '@nestjs/common';
import { CampaignsRepository } from '../campaigns.repository';
import { CampaignsRelationalRepository } from './repositories/campaigns.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsEntity } from './entities/campaigns.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CampaignsEntity])],
  providers: [
    {
      provide: CampaignsRepository,
      useClass: CampaignsRelationalRepository,
    },
  ],
  exports: [CampaignsRepository],
})
export class RelationalCampaignsPersistenceModule {}
