import { Injectable } from '@nestjs/common';
import { simpleParser } from 'mailparser';
import { createReadStream } from 'fs';
import axios from 'axios';

@Injectable()
export class EmlReaderService {
  async parseFromPath(path: string) {
    const stream = createReadStream(path);
    return simpleParser(stream);
  }

  async parseFromUrl(url: string) {
    const response = await axios.get(url, {
      responseType: 'stream',
      timeout: 15000,
    });
    return simpleParser(response.data);
  }
}