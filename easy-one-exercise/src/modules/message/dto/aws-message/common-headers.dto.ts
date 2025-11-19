import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommonHeadersDto {
  @ApiProperty({
    description: 'Return-Path header of the email',
    example: 'sender@domain.com',
  })
  @IsString()
  returnPath: string;

  @ApiProperty({
    description: 'List of email senders',
    type: [String],
    example: ['sender@example.com'],
  })
  @IsArray()
  from: string[];

  @ApiProperty({
    description: 'Date the email was sent',
    example: 'Fri, 11 Sep 2015 20:32:32 +0000',
  })
  @IsString()
  date: string;

  @ApiProperty({
    description: 'Primary email recipients',
    type: [String],
    example: ['recipient@example.com'],
  })
  @IsArray()
  to: string[];

  @ApiProperty({
    description: 'CC recipients',
    type: [String],
    example: ['cc@example.com', 'cc2@example.com'],
  })
  @IsArray()
  cc: string[];

  @ApiProperty({
    description: 'Message ID of the email',
    example: '<61967230@example.com>',
  })
  @IsString()
  messageId: string;

  @ApiProperty({
    description: 'Email subject',
    example: 'Example subject',
  })
  @IsString()
  subject: string;
}
