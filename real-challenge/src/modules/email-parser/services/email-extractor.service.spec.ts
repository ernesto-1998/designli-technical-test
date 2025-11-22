import { Test, TestingModule } from '@nestjs/testing';
import { EmailExtractorService } from './email-extractor.service';
import { BodyParserService } from './body-parser.service';
import { FileDownloaderService } from './file-downloader.service';
import { WebScraperService } from './web-scraper.service';
import { NotFoundException } from '@nestjs/common';
import { mockParsedEmail, mockJsonResponse } from '../mocks';
import { SourceType } from 'src/common/enums';
import { Attachment } from 'mailparser';

const mockBodyParser = {
  extractJsonUrls: jest.fn(),
  extractPageUrls: jest.fn(),
} satisfies Partial<BodyParserService>;

const mockDownloader = {
  downloadJson: jest.fn(),
} satisfies Partial<FileDownloaderService>;

const mockScraper = {
  scrapeJsonFromPage: jest.fn(),
} satisfies Partial<WebScraperService>;

describe('EmailExtractorService', () => {
  let service: EmailExtractorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailExtractorService,
        { provide: BodyParserService, useValue: mockBodyParser },
        { provide: FileDownloaderService, useValue: mockDownloader },
        { provide: WebScraperService, useValue: mockScraper },
      ],
    }).compile();

    service = module.get(EmailExtractorService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should return JSON from attachment when present', async () => {
    const emailWithAttachment = {
      ...mockParsedEmail,
      attachments: [
        {
          filename: 'data.json',
          contentType: 'application/json',
          contentDisposition: 'attachment',
          content: Buffer.from(JSON.stringify(mockJsonResponse.data)),
          size: 200,
          headers: new Map(),
          checksum: 'abc123',
        } as Attachment,
      ],
    };

    const result = await service.extractJson(emailWithAttachment);

    expect(result).toEqual({
      data: mockJsonResponse.data,
      source: SourceType.ATTACHMENT,
      path: 'data.json',
    });
    expect(mockBodyParser.extractJsonUrls).not.toHaveBeenCalled();
  });

  it('should return JSON from direct link in body', async () => {
    const url = 'https://example.com/data.json';
    mockBodyParser.extractJsonUrls.mockReturnValue([url]);
    mockDownloader.downloadJson.mockResolvedValue(mockJsonResponse.data);

    const result = await service.extractJson(mockParsedEmail);

    expect(result).toEqual({
      data: mockJsonResponse.data,
      source: SourceType.DIRECT_LINK,
      path: url,
    });
    expect(mockDownloader.downloadJson).toHaveBeenCalledWith(url);
  });

  it('should return JSON scraped from intermediate page', async () => {
    const pageUrl = 'https://report.example.com/view/123';
    mockBodyParser.extractJsonUrls.mockReturnValue([]);
    mockBodyParser.extractPageUrls.mockReturnValue([pageUrl]);
    mockScraper.scrapeJsonFromPage.mockResolvedValue(mockJsonResponse.data);

    const result = await service.extractJson(mockParsedEmail);

    expect(result).toEqual({
      data: mockJsonResponse.data,
      source: SourceType.SCRAPED_LINK,
      path: pageUrl,
    });
    expect(mockScraper.scrapeJsonFromPage).toHaveBeenCalledWith(pageUrl);
  });

  it('should throw NotFoundException when no JSON is found anywhere', async () => {
    mockBodyParser.extractJsonUrls.mockReturnValue([]);
    mockBodyParser.extractPageUrls.mockReturnValue([]);
    mockDownloader.downloadJson.mockResolvedValue(null);
    mockScraper.scrapeJsonFromPage.mockResolvedValue(null);

    await expect(service.extractJson(mockParsedEmail)).rejects.toThrow(
      NotFoundException,
    );
  });
});
