import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class EmailResponseDto {
  @ApiProperty({
    description: 'Whether the email is marked as spam (PASS = true)',
  })
  @Expose()
  spam: boolean;

  @ApiProperty({
    description: 'Whether the email passed virus checks (PASS = true)',
  })
  @Expose()
  virus: boolean;

  @ApiProperty({
    description:
      'DNS validation: true only if SPF, DKIM and DMARC verdicts are PASS',
  })
  @Expose()
  dns: boolean;

  @ApiProperty({
    description: 'Email month extracted from mail.timestamp',
    example: 'October',
  })
  @Expose()
  mes: string;

  @ApiProperty({
    description: 'True if processingTimeMillis exceeded 1000ms',
  })
  @Expose()
  retrasado: boolean;

  @ApiProperty({
    description:
      'Sender username without domain (e.g. john instead of john@gmail.com)',
    example: 'john',
  })
  @Expose()
  emisor: string;

  @ApiProperty({
    type: [String],
    description: 'Recipient usernames without domain',
    example: ['alice', 'bob'],
  })
  @Expose()
  receptor: string[];
}
