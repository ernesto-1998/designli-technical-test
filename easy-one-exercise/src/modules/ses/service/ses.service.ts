import { Injectable } from '@nestjs/common';
import { AwsMessageRequestDto } from '../dto/aws-message';
import { EmailResponseMapper } from '../mappers';
import { EmailResponseDto } from '../dto/response';

@Injectable()
export class SesService {
  constructor(private readonly mapper: EmailResponseMapper) {}

  validate(awsMessageRequestDto: AwsMessageRequestDto): EmailResponseDto {
    return this.mapper.toResponseDto(awsMessageRequestDto);
  }
}
