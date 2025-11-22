import { Injectable } from '@nestjs/common';
import { ParseEmailDto } from '../dto/parse-email.dto';
import { JsonResponseDto } from '../dto/json-response.dto';
import { EmlReaderService } from './eml-reader.service';
import { EmailExtractorService } from './email-extractor.service';

@Injectable()
export class EmailParserService {
  constructor(
    private readonly emlReaderService: EmlReaderService,
    private readonly emailExtractorService: EmailExtractorService,
  ) {}

  async parseEmail(parseEmailDto: ParseEmailDto): Promise<JsonResponseDto> {
    const { source } = parseEmailDto;

    const parsedEmail = await this.emlReaderService.parse(source);
    const jsonResult =
      await this.emailExtractorService.extractJson(parsedEmail);

    return jsonResult;
  }
}
