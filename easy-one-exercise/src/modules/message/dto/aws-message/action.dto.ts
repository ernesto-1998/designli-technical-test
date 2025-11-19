import { IsString } from 'class-validator';

export class ActionDto {
  @IsString()
  type: string;

  @IsString()
  topicArn: string;
}
