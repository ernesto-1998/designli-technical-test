import { Injectable } from '@nestjs/common';
import { ParseEmailDto } from '../dto/parse-email.dto';
import { JsonResponseDto } from '../dto/json-response.dto';
import { SourceType } from 'src/common/enums';
import { EmlReaderService } from './eml-reader.service';

@Injectable()
export class EmailParserService {
  constructor(
    private readonly emlReaderService: EmlReaderService,
  ) {}

  async handleParsing(parseEmailDto: ParseEmailDto): Promise<JsonResponseDto> {
    const { source } = parseEmailDto;

    const isUrl = source.startsWith('http://') || source.startsWith('https://');

    const email = isUrl
      ? await this.emlReaderService.parseFromUrl(source)
      : await this.emlReaderService.parseFromPath(source);
      
    return {
      data: null,
      source: SourceType.ATTACHMENT,
      path: parseEmailDto.source,
    };
  }
}
