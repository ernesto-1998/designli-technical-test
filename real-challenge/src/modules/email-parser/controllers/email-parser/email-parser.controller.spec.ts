import { Test, TestingModule } from '@nestjs/testing';
import { EmailParserController } from './email-parser.controller';
import { EmailParserService } from '../../services/email-parser.service';
import { ParseEmailDto } from '../../dto/parse-email.dto';
import { mockJsonResponse } from '../../mocks';

describe('EmailParserController', () => {
  let controller: EmailParserController;
  let emailParserService: EmailParserService;

  const mockEmailParserService = {
    parseEmail: jest.fn(),
  } satisfies Partial<EmailParserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailParserController],
      providers: [
        {
          provide: EmailParserService,
          useValue: mockEmailParserService,
        },
      ],
    }).compile();

    controller = module.get<EmailParserController>(EmailParserController);
    emailParserService = module.get<EmailParserService>(EmailParserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should parse .eml and return extracted JSON', async () => {
    const dto: ParseEmailDto = { source: 'https://example.com/email.eml' };
    mockEmailParserService.parseEmail.mockResolvedValue(mockJsonResponse);

    const result = await controller.parseEmail(dto);

    expect(emailParserService.parseEmail).toHaveBeenCalledWith(dto);
    expect(emailParserService.parseEmail).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockJsonResponse);
  });

  it('should propagate errors from service', async () => {
    const dto: ParseEmailDto = { source: 'invalid.eml' };
    const error = new Error('File not found');
    mockEmailParserService.parseEmail.mockRejectedValue(error);

    await expect(controller.parseEmail(dto)).rejects.toThrow('File not found');
  });
});
