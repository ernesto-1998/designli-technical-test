import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ReceiptDto } from './receipt.dto';
import { MailDto } from './mail.dto';

export class SesDto {
  @ValidateNested()
  @Type(() => ReceiptDto)
  receipt: ReceiptDto;

  @ValidateNested()
  @Type(() => MailDto)
  mail: MailDto;
}
