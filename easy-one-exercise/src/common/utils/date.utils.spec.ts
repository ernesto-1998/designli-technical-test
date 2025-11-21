import { extractMonthFromTimestamp } from './date.utils';

describe('extractMonthFromTimestamp', () => {
  it('should be defined', () => {
    expect(extractMonthFromTimestamp).toBeDefined();
  });

  it('should extract month name from valid timestamp', () => {
    const result = extractMonthFromTimestamp('2015-09-11T20:32:33.936Z');
    expect(result).toBe('September');
  });

  it('should handle different months correctly', () => {
    expect(extractMonthFromTimestamp('2015-01-15T00:00:00.000Z')).toBe(
      'January',
    );
    expect(extractMonthFromTimestamp('2015-02-15T00:00:00.000Z')).toBe(
      'February',
    );
    expect(extractMonthFromTimestamp('2015-03-15T00:00:00.000Z')).toBe('March');
    expect(extractMonthFromTimestamp('2015-12-15T00:00:00.000Z')).toBe(
      'December',
    );
  });

  it('should handle different years', () => {
    const result = extractMonthFromTimestamp('2024-09-11T20:32:33.936Z');
    expect(result).toBe('September');
  });

  it('should return "Invalid Date" for invalid timestamp', () => {
    const result = extractMonthFromTimestamp('invalid-timestamp');
    expect(result).toBe('Invalid Date');
  });

  it('should return "Invalid Date" for a negative year', () => {
    const result = extractMonthFromTimestamp('-2024-09-11T20:32:33.936Z');
    expect(result).toBe('Invalid Date');
  });

  it('should return "Invalid Date" for empty string', () => {
    const result = extractMonthFromTimestamp('');
    expect(result).toBe('Invalid Date');
  });

  it('should handle edge case with malformed date', () => {
    const result = extractMonthFromTimestamp('2015-13-11T20:32:33.936Z');
    expect(result).toBe('Invalid Date');
  });
});
