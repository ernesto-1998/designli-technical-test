import { Type } from 'class-transformer';
import { IsString, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { HeaderDto } from './header.dto';
import { CommonHeadersDto } from './common-headers.dto';

export class MailDto {
  @IsString()
  timestamp: string;

  @IsString()
  source: string;

  @IsString()
  messageId: string;

  @IsArray()
  destination: string[];

  @IsBoolean()
  headersTruncated: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HeaderDto)
  headers: HeaderDto[];

  @ValidateNested()
  @Type(() => CommonHeadersDto)
  commonHeaders: CommonHeadersDto;
}
