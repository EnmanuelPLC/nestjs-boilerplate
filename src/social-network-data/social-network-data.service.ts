import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SocialNetworkDataService {
  constructor(private readonly httpService: HttpService) {}

  // tiktok method
  async getTikTokVideoStats(url: string): Promise<any> {
    if (!this.isValidTikTokUrl(url)) {
      throw new Error('Invalid TikTok URL');
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0', // prevent bot detection
          },
        }),
      );

      const $ = cheerio.load(response.data);

      const scriptTag = $('script#__UNIVERSAL_DATA_FOR_REHYDRATION__').html();

      const jsonData = JSON.parse(scriptTag || '{}');

      // Extract video stats
      const videoData =
        jsonData?.__DEFAULT_SCOPE__?.['webapp.video-detail']?.itemInfo
          ?.itemStruct;

      if (!videoData) return null;

      return {
        author: videoData.author,
        ...videoData.stats,
      };
    } catch (error) {
      console.error('Failed to fetch TikTok data:', error.message);
      return null;
    }
  }

  async getYoutubeVideoStats(url: string): Promise<any> {
    const videoId = this.extractVideoId(url);

    if (!videoId) throw new Error('Invalid YouTube URL');
    const baseurl = `https://www.googleapis.com/youtube/v3/videos`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(baseurl, {
          params: {
            part: 'statistics,snippet',
            id: videoId,
            key: 'AIzaSyDKNohOaCqKsza6TaPIbXeDg-YwIc9qB_c',
          },
        }),
      );

      if (response.status !== 200) return null;

      const data = response.data.items[0];
      return {
        title: data.snippet.title,
        views: data.statistics.viewCount,
        likes: data.statistics.likeCount,
        comments: data.statistics.commentCount,
        publishedAt: data.snippet.publishedAt,
      };
    } catch (error) {
      throw new Error(`Failed to fetch YouTube data: ${error.message}`);
    }
  }

  extractVideoId(url: string): string | null {
    // Handles URLs like:
    // - https://www.youtube.com/watch?v=VIDEO_ID
    // - https://youtu.be/VIDEO_ID
    const regex = /(?:v=|\/)([a-zA-Z0-9_-]{11})(?:&|\/|$)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  isValidTikTokUrl(url: string): boolean {
    const regex = /^https?:\/\/(www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+/;
    return regex.test(url);
  }
}
