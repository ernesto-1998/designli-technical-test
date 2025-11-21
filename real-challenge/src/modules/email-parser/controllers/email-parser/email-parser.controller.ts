import { Controller, Post, Body } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JsonResponseDto, ParseEmailDto } from '../../dto';
import { EmailParserService } from '../../services';

@Controller({ version: '1', path: 'email-parser' })
export class EmailParserController {
  constructor(private readonly emailParserService: EmailParserService) {}

  @Post()
  @ApiOperation({ summary: 'Parse an .eml file from URL or file path' })
  @ApiOkResponse({
    description: 'JSON successfully extracted from the email',
    type: JsonResponseDto,
  })
  async parseEmail(@Body() parseEmailDto: ParseEmailDto): Promise<JsonResponseDto> {
    return this.emailParserService.handleParsing(parseEmailDto);
  }
}

