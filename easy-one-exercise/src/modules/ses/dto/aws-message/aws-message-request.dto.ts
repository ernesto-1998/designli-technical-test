import { Type } from 'class-transformer';
import { ValidateNested, IsArray } from 'class-validator';
import { RecordDto } from './record.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AwsMessageRequestDto {
  @ApiProperty({
    type: [RecordDto],
    description: 'List of SES event records received from AWS',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecordDto)
  Records: RecordDto[];
}
