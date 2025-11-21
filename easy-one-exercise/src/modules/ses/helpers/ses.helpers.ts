import { SesVerdictStatus } from 'src/common/enums';

export const isPass = (status: string): boolean =>
  status === SesVerdictStatus.PASS;
