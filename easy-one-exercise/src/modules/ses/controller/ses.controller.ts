import { Controller, Post, Body } from '@nestjs/common';
import { SesService } from '../service/ses.service';
import { AwsMessageRequestDto } from '../dto/aws-message';
import { EmailResponseDto } from '../dto/response';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller({ version: '1', path: 'ses' })
export class SesController {
  constructor(private readonly sesService: SesService) {}

  @ApiOperation({ summary: 'Process an AWS SES email message' })
  @ApiOkResponse({ type: EmailResponseDto })
  @Post('validate')
  process(@Body() awsMessageRequestDto: AwsMessageRequestDto): EmailResponseDto {
    return this.sesService.process(awsMessageRequestDto);
  }
}
