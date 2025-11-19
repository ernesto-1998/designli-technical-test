import { IsString, IsArray } from 'class-validator';

export class CommonHeadersDto {
  @IsString()
  returnPath: string;

  @IsArray()
  from: string[];

  @IsString()
  date: string;

  @IsArray()
  to: string[];

  @IsArray()
  cc: string[];

  @IsString()
  messageId: string;

  @IsString()
  subject: string;
}
