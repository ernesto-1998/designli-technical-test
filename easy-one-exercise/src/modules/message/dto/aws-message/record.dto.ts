import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SesDto } from './ses.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RecordDto {
  @ApiProperty({
    description: 'Version of the SES event record format',
    example: '1.0',
  })
  @IsString()
  eventVersion: string;

  @ApiProperty({
    type: SesDto,
    description: 'SES event payload including mail and receipt details',
  })
  @ValidateNested()
  @Type(() => SesDto)
  ses: SesDto;

  @ApiProperty({
    description: 'Source of the event, usually "aws:ses"',
    example: 'aws:ses',
  })
  @IsString()
  eventSource: string;
}
