import { SourceType } from 'src/common/enums';
import { JsonResponseDto } from '../dto';
import { ParsedMail } from 'mailparser';

export const mockParsedEmail: ParsedMail = {
  headerLines: [],
  headers: new Map(),
  subject: 'Test Email',
  from: {
    value: [{ address: 'sender@example.com', name: '' }],
    html: '',
    text: 'sender@example.com',
  },
  to: {
    value: [{ address: 'recipient@example.com', name: '' }],
    html: '',
    text: 'recipient@example.com',
  },
  text: 'Test body',
  html: '<p>Test body</p>',
  attachments: [],
};

export const mockJsonResponse: JsonResponseDto = {
  data: { test: 'data' },
  source: SourceType.ATTACHMENT,
  path: 'test.json',
};
