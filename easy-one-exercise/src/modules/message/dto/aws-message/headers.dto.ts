import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class HeadersDto {
  @ApiProperty({
    description: 'Header name',
    example: 'From',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Header value',
    example: '<no-reply@amazon.com>',
  })  
  @IsString()
  value: string;
}
