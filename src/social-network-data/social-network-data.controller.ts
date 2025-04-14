import { Controller, Get, Param } from '@nestjs/common';
import { SocialNetworkDataService } from './social-network-data.service';

@Controller('social-network-data')
export class SocialNetworkDataController {
  constructor(
    private readonly scrapSocialNetworkDataService: SocialNetworkDataService,
  ) {}

  @Get('tiktok/:url')
  async getTikTokVideoStats(@Param('url') videoUrl: string) {
    return this.scrapSocialNetworkDataService.getTikTokVideoStats(videoUrl);
  }

  @Get('youtube/:url')
  async getVideoInfo(@Param('url') url: string): Promise<any> {
    return this.scrapSocialNetworkDataService.getYoutubeVideoStats(url);
  }
}
