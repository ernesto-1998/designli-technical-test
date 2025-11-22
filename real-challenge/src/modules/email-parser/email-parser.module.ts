import { Module } from '@nestjs/common';
import { EmailParserController } from './controllers/email-parser/email-parser.controller';
import { EmailParserService } from './services/email-parser.service';
import { EmlReaderService } from './services/eml-reader.service';

@Module({
  controllers: [EmailParserController],
  providers: [EmailParserService, EmlReaderService]
})
export class EmailParserModule {}
