import { ApiProperty } from '@nestjs/swagger';

export class EmailResponseDto {
  @ApiProperty({ description: 'Whether the email is marked as spam (PASS = true)' })
  spam: boolean;

  @ApiProperty({ description: 'Whether the email passed virus checks (PASS = true)' })
  virus: boolean;

  @ApiProperty({
    description:
      'DNS validation: true only if SPF, DKIM and DMARC verdicts are PASS',
  })
  dns: boolean;

  @ApiProperty({ description: 'Email month extracted from mail.timestamp' })
  mes: string;

  @ApiProperty({
    description: 'True if processingTimeMillis exceeded 1000ms',
  })
  retrasado: boolean;

  @ApiProperty({
    description: 'Sender username without domain (e.g. john instead of john@gmail.com)',
  })
  emisor: string;

  @ApiProperty({
    type: [String],
    description: 'Recipient usernames without domain',
  })
  receptor: string[];
}
