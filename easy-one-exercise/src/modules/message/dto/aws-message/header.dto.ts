import { IsString } from 'class-validator';

export class HeaderDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}
