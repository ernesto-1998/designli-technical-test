import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from '../service/message.service';
import { AwsMessageRequestDto } from '../dto/aws-message';

@Controller({ version: '1', path: 'messages' })
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() awsMessageRequestDto: AwsMessageRequestDto) {
    return this.messageService.create(awsMessageRequestDto);
  }
}
