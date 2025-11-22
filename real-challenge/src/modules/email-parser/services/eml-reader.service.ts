import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { simpleParser, ParsedMail } from 'mailparser';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import axios from 'axios';
import { URL } from 'url';

@Injectable()
export class EmlReaderService {
  async parse(source: string): Promise<ParsedMail> {
    return this.isUrl(source)
      ? this.parseFromUrl(source)
      : this.parseFromPath(source);
  }

  private isUrl(value: string): boolean {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  async parseFromPath(path: string): Promise<ParsedMail> {
    const exists = await stat(path).catch(() => null);
    if (!exists || !exists.isFile()) {
      throw new NotFoundException(`File not found: ${path}`);
    }

    const stream = createReadStream(path);
    return simpleParser(stream);
  }

  async parseFromUrl(url: string): Promise<ParsedMail> {
    const response = await axios.get(url, {
      responseType: 'stream',
      timeout: 15000,
      validateStatus: () => true,
    });

    if (!response.data || response.status >= 400) {
      const isNetworkOrInvalidUrlError =
        !response.request || response.status === 0;

      if (isNetworkOrInvalidUrlError) {
        throw new BadRequestException(`Invalid or unreachable URL: ${url}`);
      }

      throw new NotFoundException(
        `Failed to download EML: status ${response.status} - ${url}`,
      );
    }

    return simpleParser(response.data);
  }
}
