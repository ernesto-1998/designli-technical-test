import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { FileDownloaderService } from './file-downloader.service';

@Injectable()
export class WebScraperService {
  constructor(private readonly downloaderService: FileDownloaderService) {}

  async scrapeJsonFromPage(url: string): Promise<Record<string, any>> {
    try {
      const pageResponse = await axios.get(url, {
        timeout: 15000,
        responseType: 'text',
        validateStatus: () => true,
      });

      if (pageResponse.status !== 200) {
        throw new NotFoundException(`Page not found at ${url}`);
      }

      const $ = cheerio.load(pageResponse.data);

      const jsonLink = $('a[href$=".json"]').attr('href');

      if (!jsonLink) {
        throw new NotFoundException(`No JSON link found in page at ${url}`);
      }

      const jsonUrl = new URL(jsonLink, url).href;

      try {
        return await this.downloaderService.downloadJson(jsonUrl);
      } catch (error) {
        throw new NotFoundException(
          `Failed to download JSON from ${jsonUrl}: ${error.message}`,
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new NotFoundException(
        `Failed to scrape page at ${url}: ${error.message}`,
      );
    }
  }
}
