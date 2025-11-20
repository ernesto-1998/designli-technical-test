import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { EmailResponseDto } from '../dto/response';
import { AwsMessageRequestDto } from '../dto/aws-message';
import {
  extractMonthFromTimestamp,
  extractUsernameFromEmail,
} from 'src/common/utils';
import { isPass } from '../helpers/ses.helpers';

@Injectable()
export class EmailResponseMapper {
  toResponseDto(inputDto: AwsMessageRequestDto): EmailResponseDto {
    const record = inputDto.Records[0];
    const ses = record.ses;

    const spam = isPass(ses.receipt.spamVerdict.status);
    const virus = isPass(ses.receipt.virusVerdict.status);

    const dns =
      isPass(ses.receipt.spfVerdict.status) &&
      isPass(ses.receipt.dkimVerdict.status) &&
      isPass(ses.receipt.dmarcVerdict.status);

    const mes = extractMonthFromTimestamp(ses.mail.timestamp);

    const retrasado = ses.receipt.processingTimeMillis > 1000;

    const emisor = extractUsernameFromEmail(ses.mail.source);

    const receptor = ses.mail.destination.map(extractUsernameFromEmail);

    const plainObject = {
      spam,
      virus,
      dns,
      mes,
      retrasado,
      emisor,
      receptor,
    };

    return plainToInstance(EmailResponseDto, plainObject, {
      excludeExtraneousValues: false,
    });
  }
}
