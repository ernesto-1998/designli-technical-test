import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SesDto } from './ses.dto';

export class RecordDto {
  @IsString()
  eventVersion: string;

  @ValidateNested()
  @Type(() => SesDto)
  ses: SesDto;

  @IsString()
  eventSource: string;
}
