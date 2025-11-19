import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from '../service/message.service';

@Controller({ version: '1', path: 'messages' })
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() createMessageDto) {
    return this.messageService.create(createMessageDto);
  }
}
