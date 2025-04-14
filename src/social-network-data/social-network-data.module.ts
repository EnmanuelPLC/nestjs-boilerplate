import { Module } from '@nestjs/common';
import { SocialNetworkDataController } from './social-network-data.controller';
import { SocialNetworkDataService } from './social-network-data.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SocialNetworkDataController],
  providers: [SocialNetworkDataService],
})
export class SocialNetworkDataModule {}
