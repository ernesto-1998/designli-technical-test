import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  create(createMessageDto) {
    return 'This action adds a new message';
  }
}
