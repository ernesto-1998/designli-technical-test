import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { VerdictDto } from './verdict.dto';
import { ActionDto } from './action.dto';
import { DmarcPolicy } from 'src/common/enums';

export class ReceiptDto {
  @IsString()
  timestamp: string;

  @IsNumber()
  processingTimeMillis: number;

  @IsArray()
  recipients: string[];

  @ValidateNested()
  @Type(() => VerdictDto)
  spamVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  virusVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  spfVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  dkimVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  dmarcVerdict: VerdictDto;

  @IsEnum(DmarcPolicy)
  dmarcPolicy: DmarcPolicy;

  @ValidateNested()
  @Type(() => ActionDto)
  action: ActionDto;
}
