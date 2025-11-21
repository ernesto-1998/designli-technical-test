import { Injectable } from '@nestjs/common';
import { ParseEmailDto } from '../dto/parse-email.dto';
import { JsonResponseDto } from '../dto/json-response.dto';
import { SourceType } from 'src/common/enums';

@Injectable()
export class EmailParserService {
  constructor(
  ) {}

  async handleParsing(parseEmailDto: ParseEmailDto): Promise<JsonResponseDto> {
    return {
      data: null,
      source: SourceType.ATTACHMENT,
      path: parseEmailDto.source,
    };
  }
}
