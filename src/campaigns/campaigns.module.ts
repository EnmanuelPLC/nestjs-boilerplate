import { StatusesModule } from '../statuses/statuses.module';
import { UsersModule } from '../users/users.module';
import {
  // common
  Module,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { RelationalCampaignsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    StatusesModule,

    UsersModule,

    // import modules, etc.
    RelationalCampaignsPersistenceModule,
  ],
  controllers: [CampaignsController],
  providers: [CampaignsService],
  exports: [CampaignsService, RelationalCampaignsPersistenceModule],
})
export class CampaignsModule {}
