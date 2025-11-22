import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FileDownloaderService {
  async downloadJson(url: string): Promise<Record<string, any>> {
    try {
      const response = await axios.get(url, {
        responseType: 'json',
        timeout: 15000,
        validateStatus: () => true,
      });

      if (response.status !== 200) {
        throw new BadRequestException(
          `Failed to fetch JSON from ${url}. Status: ${response.status}`,
        );
      }

      if (typeof response.data !== 'object') {
        throw new BadRequestException(`Invalid JSON content at ${url}`);
      }

      return response.data;
    } catch (error) {
      throw new BadRequestException(
        `Error downloading JSON from ${url}: ${error.message}`,
      );
    }
  }
}
