import { SesVerdictStatus } from 'src/common/enums';
import { isPass } from './ses.helpers';

describe('isPass helper', () => {
  it('should return true when status is PASS', () => {
    const result = isPass(SesVerdictStatus.PASS);
    expect(result).toBe(true);
  });

  it('should return false when status is FAIL', () => {
    const result = isPass(SesVerdictStatus.FAIL);
    expect(result).toBe(false);
  });

  it('should return false when status is undefined', () => {
    const result = isPass(undefined as unknown as string);
    expect(result).toBe(false);
  });

  it('should return false for random strings', () => {
    const result = isPass('RANDOM');
    expect(result).toBe(false);
  });
});
