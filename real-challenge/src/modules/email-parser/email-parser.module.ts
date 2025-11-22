import { Module } from '@nestjs/common';
import { EmailParserController } from './controllers/email-parser/email-parser.controller';
import { EmailParserService } from './services/email-parser.service';
import { EmlReaderService } from './services/eml-reader.service';
import { EmailExtractorService } from './services/email-extractor.service';
import { BodyParserService } from './services/body-parser.service';
import { FileDownloaderService } from './services/file-downloader.service';
import { WebScraperService } from './services/web-scraper.service';

@Module({
  controllers: [EmailParserController],
  providers: [
    EmailParserService,
    EmlReaderService,
    EmailExtractorService,
    BodyParserService,
    FileDownloaderService,
    WebScraperService,
  ],
})
export class EmailParserModule {}
