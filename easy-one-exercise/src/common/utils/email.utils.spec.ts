import { extractUsernameFromEmail } from './email.utils';

describe('extractUsernameFromEmail', () => {
  it('should be defined', () => {
    expect(extractUsernameFromEmail).toBeDefined();
  });

  it('should extract username from valid email', () => {
    const result = extractUsernameFromEmail('user@example.com');
    expect(result).toBe('user');
  });

  it('should extract username from email with subdomain', () => {
    const result = extractUsernameFromEmail('admin@mail.example.com');
    expect(result).toBe('admin');
  });

  it('should extract complex username', () => {
    const result = extractUsernameFromEmail('user.name+tag@example.com');
    expect(result).toBe('user.name+tag');
  });

  it('should extract UUID-like username', () => {
    const result = extractUsernameFromEmail(
      '61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com',
    );
    expect(result).toBe('61967230-7A45-4A9D-BEC9-87CBCF2211C9');
  });

  it('should return empty string when email is null', () => {
    const result = extractUsernameFromEmail(null as unknown as string);
    expect(result).toBe('');
  });

  it('should return empty string when email is undefined', () => {
    const result = extractUsernameFromEmail(undefined as unknown as string);
    expect(result).toBe('');
  });

  it('should return empty string when email is empty string', () => {
    const result = extractUsernameFromEmail('');
    expect(result).toBe('');
  });

  it('should return full string when no @ present', () => {
    const result = extractUsernameFromEmail('invalid-email');
    expect(result).toBe('invalid-email');
  });

  it('should handle email with multiple @ symbols', () => {
    const result = extractUsernameFromEmail('user@name@example.com');
    expect(result).toBe('user');
  });

  it('should handle email starting with @', () => {
    const result = extractUsernameFromEmail('@example.com');
    expect(result).toBe('');
  });
});
