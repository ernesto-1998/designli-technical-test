import { Test, TestingModule } from '@nestjs/testing';
import { SesService } from './ses.service';
import { EmailResponseMapper } from '../mappers';
import { emailResponseDtoMock, sesSnsEventMock } from '../mocks';

describe('SesService', () => {
  let service: SesService;
  let mapper: jest.Mocked<EmailResponseMapper>;

  beforeEach(async () => {
    const mockMapper = {
      toResponseDto: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SesService,
        {
          provide: EmailResponseMapper,
          useValue: mockMapper,
        },
      ],
    }).compile();

    service = module.get<SesService>(SesService);
    mapper = module.get(EmailResponseMapper);
  });

  it('should call mapper.toResponseDto', () => {
    mapper.toResponseDto.mockReturnValue(emailResponseDtoMock);

    const result = service.validate(sesSnsEventMock);

    expect(mapper.toResponseDto).toHaveBeenCalledWith(sesSnsEventMock);
    expect(result).toEqual(emailResponseDtoMock);
  });
});
