import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ParseEmailDto {
  @ApiProperty({
    description: 'URL or file path of the .eml file to parse',
    example: 'https://example.com/email.eml',
  })
  @IsString()
  @IsNotEmpty()
  source: string;
}
