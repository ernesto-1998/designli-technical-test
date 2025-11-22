import { ApiProperty } from '@nestjs/swagger';
import { SourceType } from 'src/common/enums';

export class JsonResponseDto {
  @ApiProperty({
    description: 'The extracted JSON data from the email',
    example: { key: 'value', data: 'example' },
  })
  data: string | object;

  @ApiProperty({
    description: 'Source type where JSON was found',
    enum: SourceType,
    example: SourceType.ATTACHMENT,
  })
  source: SourceType;

  @ApiProperty({
    description: 'Original source URL or path of the JSON',
    example: 'https://example.com/data.json',
  })
  path: string;
}
