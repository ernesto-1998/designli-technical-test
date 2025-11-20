import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActionDto {
  @ApiProperty({
    description: 'Type of action executed by the SES notification (e.g., "SNS")',
    example: 'SNS',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'ARN of the SNS topic where the notification was published',
    example: 'arn:aws:sns:us-east-1:123456789012:MyTopic',
  })
  @IsString()
  topicArn: string;
}
