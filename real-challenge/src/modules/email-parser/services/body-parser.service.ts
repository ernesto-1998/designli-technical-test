import { Injectable } from '@nestjs/common';
import { ParsedMail } from 'mailparser';

@Injectable()
export class BodyParserService {
  extractJsonUrls(parsedEmail: ParsedMail): string[] {
    const textContent = [parsedEmail.text, parsedEmail.html]
      .filter(Boolean)
      .join(' ');
    const urlRegex = /(https?:\/\/[^\s<>"']+\.json)/gi;
    const matches = textContent.match(urlRegex);

    return matches || [];
  }

  extractPageUrls(parsedEmail: ParsedMail): string[] {
    const textContent = [parsedEmail.text, parsedEmail.html]
      .filter(Boolean)
      .join(' ');
    const urlRegex = /(https?:\/\/[^\s<>"']+)/gi;
    const matches = textContent.match(urlRegex) || [];

    return matches.filter((url) => !url.endsWith('.json'));
  }
}
