import { IsEnum } from 'class-validator';
import { SesVerdictStatus } from 'src/common/enums';

export class VerdictDto {
  @IsEnum(SesVerdictStatus)
  status: SesVerdictStatus;
}
