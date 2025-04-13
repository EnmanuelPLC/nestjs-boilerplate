import { Module } from '@nestjs/common';
import { AdRepository } from '../ad.repository';
import { AdRelationalRepository } from './repositories/ad.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdEntity } from './entities/ad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdEntity])],
  providers: [
    {
      provide: AdRepository,
      useClass: AdRelationalRepository,
    },
  ],
  exports: [AdRepository],
})
export class RelationalAdPersistenceModule {}
