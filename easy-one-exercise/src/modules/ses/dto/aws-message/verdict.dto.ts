import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { SesVerdictStatus } from 'src/common/enums';

export class VerdictDto {
  @ApiProperty({
    enum: SesVerdictStatus,
    description: 'Result of the message analysis by AWS SES',
    example: SesVerdictStatus.PASS,
  })
  @IsEnum(SesVerdictStatus)
  status: SesVerdictStatus;
}
