import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsEmail,
} from 'class-validator';
import { HeadersDto } from './headers.dto';
import { CommonHeadersDto } from './common-headers.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MailDto {
  @ApiProperty({
    description: 'Timestamp when the email was received',
    example: '2015-09-11T20:32:33.936Z',
  })
  @IsString()
  timestamp: string;

  @ApiProperty({
    description: 'Sender email address',
    example: 'sender@example.com',
  })
  @IsEmail()
  source: string;

  @ApiProperty({
    description: 'Unique message ID assigned by AWS SES',
    example: 'd6iitobk75ur44p8kdnnp7g2n800',
  })
  @IsString()
  messageId: string;

  @ApiProperty({
    type: [String],
    description: 'List of email destinations',
    example: ['recipient@example.com'],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsEmail({}, { each: true })
  destination: string[];

  @ApiProperty({
    description: 'Indicates whether headers were truncated',
    example: false,
  })
  @IsBoolean()
  headersTruncated: boolean;

  @ApiProperty({
    type: [HeadersDto],
    description: 'List of header objects (name/value pairs)',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HeadersDto)
  headers: HeadersDto[];

  @ApiProperty({
    type: CommonHeadersDto,
    description: 'Simplified common email headers extracted by SES',
  })
  @ValidateNested()
  @Type(() => CommonHeadersDto)
  commonHeaders: CommonHeadersDto;
}
