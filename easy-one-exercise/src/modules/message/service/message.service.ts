import { Injectable } from '@nestjs/common';
import { AwsMessageRequestDto } from '../dto/aws-message';

@Injectable()
export class MessageService {
  create(awsMessageRequestDto: AwsMessageRequestDto) {
    return 'This action adds a new message';
  }
}
