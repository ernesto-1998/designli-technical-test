import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ReceiptDto } from './receipt.dto';
import { MailDto } from './mail.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SesDto {
  @ApiProperty({
    type: ReceiptDto,
    description: 'Information about SES processing results, verdicts, and actions',
  })
  @ValidateNested()
  @Type(() => ReceiptDto)
  receipt: ReceiptDto;

  @ApiProperty({
    type: MailDto,
    description: 'Email metadata including headers, sender, recipients, and timestamps',
  })
  @ValidateNested()
  @Type(() => MailDto)
  mail: MailDto;
}
