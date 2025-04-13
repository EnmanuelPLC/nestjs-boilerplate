import {
  // common
  Module,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { RelationalAdPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalAdPersistenceModule,
  ],
  controllers: [AdsController],
  providers: [AdsService],
  exports: [AdsService, RelationalAdPersistenceModule],
})
export class AdsModule {}
