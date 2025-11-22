import { Test, TestingModule } from '@nestjs/testing';
import { EmailParserService } from './email-parser.service';
import { EmlReaderService } from './eml-reader.service';
import { EmailExtractorService } from './email-extractor.service';
import { ParseEmailDto } from '../dto/parse-email.dto';

import { mockParsedEmail, mockJsonResponse } from '../mocks/';

describe('EmailParserService', () => {
  let service: EmailParserService;
  let emlReaderService: EmlReaderService;
  let emailExtractorService: EmailExtractorService;

  const mockEmlReaderService = {
    parse: jest.fn(),
  } satisfies Partial<EmlReaderService>;

  const mockEmailExtractorService = {
    extractJson: jest.fn(),
  } satisfies Partial<EmailExtractorService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailParserService,
        { provide: EmlReaderService, useValue: mockEmlReaderService },
        { provide: EmailExtractorService, useValue: mockEmailExtractorService },
      ],
    }).compile();

    service = module.get<EmailParserService>(EmailParserService);
    emlReaderService = module.get<EmlReaderService>(EmlReaderService);
    emailExtractorService = module.get<EmailExtractorService>(
      EmailExtractorService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should parse email and extract JSON (happy path)', async () => {
    const dto: ParseEmailDto = { source: 'http://example.com/email.eml' };

    mockEmlReaderService.parse.mockResolvedValue(mockParsedEmail);
    mockEmailExtractorService.extractJson.mockResolvedValue(mockJsonResponse);

    const result = await service.parseEmail(dto);

    expect(emlReaderService.parse).toHaveBeenCalledWith(dto.source);
    expect(emailExtractorService.extractJson).toHaveBeenCalledWith(
      mockParsedEmail,
    );
    expect(result).toEqual(mockJsonResponse);
  });

  it('should throw if emlReaderService fails', async () => {
    const dto: ParseEmailDto = { source: '/bad/path.eml' };

    mockEmlReaderService.parse.mockRejectedValue(new Error('File not found'));

    await expect(service.parseEmail(dto)).rejects.toThrow('File not found');

    expect(emailExtractorService.extractJson).not.toHaveBeenCalled();
  });

  it('should throw if extractor fails', async () => {
    const dto: ParseEmailDto = { source: '/file.eml' };

    mockEmlReaderService.parse.mockResolvedValue(mockParsedEmail);
    mockEmailExtractorService.extractJson.mockRejectedValue(
      new Error('No JSON found'),
    );

    await expect(service.parseEmail(dto)).rejects.toThrow('No JSON found');
  });
});
