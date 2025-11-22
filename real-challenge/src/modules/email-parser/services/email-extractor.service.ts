import { Injectable, NotFoundException } from '@nestjs/common';
import { ParsedMail, Attachment } from 'mailparser';
import { BodyParserService } from './body-parser.service';
import { FileDownloaderService } from './file-downloader.service';
import { WebScraperService } from './web-scraper.service';
import { SourceType } from 'src/common/enums';
import { JsonResponseDto } from '../dto';

@Injectable()
export class EmailExtractorService {
  constructor(
    private readonly bodyParserService: BodyParserService,
    private readonly downloaderService: FileDownloaderService,
    private readonly scraperService: WebScraperService,
  ) {}

  async extractJson(parsedEmail: ParsedMail): Promise<JsonResponseDto> {
    const attachmentResult = this.findJsonInAttachments(parsedEmail);

    if (attachmentResult) return attachmentResult;

    const urls = this.bodyParserService.extractJsonUrls(parsedEmail);

    for (const url of urls) {
      const json = await this.downloaderService.downloadJson(url);
      if (json)
        return { data: json, source: SourceType.DIRECT_LINK, path: url };
    }

    const pageUrls = this.bodyParserService.extractPageUrls(parsedEmail);
    for (const pageUrl of pageUrls) {
      const json = await this.scraperService.scrapeJsonFromPage(pageUrl);
      if (json)
        return { data: json, source: SourceType.SCRAPED_LINK, path: pageUrl };
    }

    throw new NotFoundException(
      'No JSON found in email: no attachment, direct link, or page link',
    );
  }

  private findJsonInAttachments(parsed: ParsedMail): JsonResponseDto | null {
    const attachment = parsed.attachments?.find(
      (att: Attachment) =>
        att.contentType === 'application/json' ||
        att.filename?.endsWith('.json'),
    );
    if (!attachment) return null;

    try {
      const data = JSON.parse(attachment.content.toString('utf-8'));
      return {
        data,
        source: SourceType.ATTACHMENT,
        path: attachment.filename || 'attachment.json',
      };
    } catch {
      return null;
    }
  }
}
