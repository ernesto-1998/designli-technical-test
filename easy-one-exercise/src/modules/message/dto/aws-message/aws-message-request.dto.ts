import { Type } from 'class-transformer';
import { ValidateNested, IsArray } from 'class-validator';
import { RecordDto } from './record.dto';

export class AwsMessageRequestDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecordDto)
  Records: RecordDto[];
}
