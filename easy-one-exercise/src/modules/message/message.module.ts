import { Module } from '@nestjs/common';
import { MessageService } from './service/message.service';
import { MessageController } from './controller/message.controller';
import { EmailResponseMapper } from './mappers';

@Module({
  controllers: [MessageController],
  providers: [MessageService, EmailResponseMapper],
})
export class MessageModule {}
