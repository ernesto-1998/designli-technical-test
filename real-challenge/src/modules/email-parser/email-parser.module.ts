import { Module } from '@nestjs/common';
import { EmailParserController } from './controllers/email-parser/email-parser.controller';
import { EmailParserService } from './services/email-parser.service';

@Module({
  controllers: [EmailParserController],
  providers: [EmailParserService]
})
export class EmailParserModule {}
