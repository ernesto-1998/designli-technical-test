import { Module } from '@nestjs/common';
import { SesController } from './controller/ses.controller';
import { SesService } from './service/ses.service';
import { EmailResponseMapper } from './mappers';

@Module({
  controllers: [SesController],
  providers: [SesService, EmailResponseMapper],
})
export class SesModule {}
