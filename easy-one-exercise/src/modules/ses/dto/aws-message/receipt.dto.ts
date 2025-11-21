import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsEnum,
  ArrayMinSize,
  IsEmail,
} from 'class-validator';
import { VerdictDto } from './verdict.dto';
import { ActionDto } from './action.dto';
import { DmarcPolicy } from 'src/common/enums';
import { ApiProperty } from '@nestjs/swagger';

export class ReceiptDto {
  @ApiProperty({
    description: 'Timestamp when the email was received',
    example: '2024-10-01T12:34:56.000Z',
  })
  @IsString()
  timestamp: string;

  @ApiProperty({ description: 'Processing time in milliseconds', example: 123 })
  @IsNumber()
  processingTimeMillis: number;

  @ApiProperty({
    type: [String],
    description: 'List of email recipients',
    example: ['recipient@example.com'],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsEmail({}, { each: true })
  recipients: string[];

  @ApiProperty({
    type: VerdictDto,
    description: 'Spam verdict evaluated by AWS SES',
  })
  @ValidateNested()
  @Type(() => VerdictDto)
  spamVerdict: VerdictDto;

  @ApiProperty({
    type: VerdictDto,
    description: 'Virus verdict evaluated by AWS SES',
  })
  @ValidateNested()
  @Type(() => VerdictDto)
  virusVerdict: VerdictDto;

  @ApiProperty({
    type: VerdictDto,
    description: 'SPF (Sender Policy Framework) verdict',
  })
  @ValidateNested()
  @Type(() => VerdictDto)
  spfVerdict: VerdictDto;

  @ApiProperty({
    type: VerdictDto,
    description: 'DKIM (DomainKeys Identified Mail) verdict',
  })
  @ValidateNested()
  @Type(() => VerdictDto)
  dkimVerdict: VerdictDto;

  @ApiProperty({
    type: VerdictDto,
    description: 'DMARC verdict evaluated by AWS SES',
  })
  @ValidateNested()
  @Type(() => VerdictDto)
  dmarcVerdict: VerdictDto;

  @ApiProperty({
    enum: DmarcPolicy,
    description: 'DMARC policy assessed by AWS SES',
    example: DmarcPolicy.REJECT,
  })
  @IsEnum(DmarcPolicy)
  dmarcPolicy: DmarcPolicy;

  @ApiProperty({
    type: ActionDto,
    description: 'Action taken by AWS SES upon receiving the message',
  })
  @ValidateNested()
  @Type(() => ActionDto)
  action: ActionDto;
}
