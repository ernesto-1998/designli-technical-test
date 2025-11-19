import { Module } from '@nestjs/common';
import { MessageService } from './service/message.service';
import { MessageController } from './controller/message.controller';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
