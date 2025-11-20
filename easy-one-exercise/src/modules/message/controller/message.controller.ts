import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from '../service/message.service';
import { AwsMessageRequestDto } from '../dto/aws-message';
import { EmailResponseDto } from '../dto/response';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller({ version: '1', path: 'messages' })
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({ summary: 'Process an AWS SES email message' })
  @ApiOkResponse({ type: EmailResponseDto })
  @Post('ses-events')
  process(@Body() awsMessageRequestDto: AwsMessageRequestDto): EmailResponseDto {
    return this.messageService.process(awsMessageRequestDto);
  }
}
