import { Test, TestingModule } from '@nestjs/testing';
import { WebScraperService } from './web-scraper.service';
import { FileDownloaderService } from './file-downloader.service';
import { NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

jest.mock('axios');
jest.mock('cheerio');

const mockDownloader = {
  downloadJson: jest.fn(),
} satisfies Partial<FileDownloaderService>;

describe('WebScraperService', () => {
  let service: WebScraperService;
  let fileDownloader: jest.Mocked<FileDownloaderService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebScraperService,
        {
          provide: FileDownloaderService,
          useValue: mockDownloader,
        },
      ],
    }).compile();

    service = module.get<WebScraperService>(WebScraperService);
    fileDownloader = module.get(FileDownloaderService);

    jest.clearAllMocks();
  });

  describe('scrapeJsonFromPage', () => {
    it('should extract JSON link from HTML and download it', async () => {
      const mockHtml = `
        <html>
          <body>
            <a href="https://example.com/data.json">Download JSON</a>
          </body>
        </html>
      `;

      const mockJsonData = { id: 1, name: 'test' };

      (axios.get as jest.Mock).mockResolvedValue({
        status: 200,
        data: mockHtml,
      });

      const mockElement = {
        attr: jest.fn().mockReturnValue('https://example.com/data.json'),
        length: 1,
      };

      const mock$ = jest.fn().mockReturnValue(mockElement);
      (cheerio.load as jest.Mock).mockReturnValue(mock$);

      fileDownloader.downloadJson.mockResolvedValue(mockJsonData);

      const result = await service.scrapeJsonFromPage(
        'https://example.com/page',
      );

      expect(axios.get).toHaveBeenCalledWith(
        'https://example.com/page',
        expect.any(Object),
      );

      expect(cheerio.load).toHaveBeenCalledWith(mockHtml);
      expect(mock$).toHaveBeenCalledWith('a[href$=".json"]');
      expect(fileDownloader.downloadJson).toHaveBeenCalledWith(
        'https://example.com/data.json',
      );
      expect(result).toEqual(mockJsonData);
    });

    it('should extract relative JSON link and convert to absolute URL', async () => {
      const mockHtml = '<a href="/data/test.json">Download</a>';
      const mockJsonData = { ok: true };

      (axios.get as jest.Mock).mockResolvedValue({
        status: 200,
        data: mockHtml,
      });

      const mockElement = {
        attr: jest.fn().mockReturnValue('/data/test.json'),
        length: 1,
      };

      const mock$ = jest.fn().mockReturnValue(mockElement);
      (cheerio.load as jest.Mock).mockReturnValue(mock$);

      fileDownloader.downloadJson.mockResolvedValue(mockJsonData);

      const result = await service.scrapeJsonFromPage('https://example.com');

      expect(fileDownloader.downloadJson).toHaveBeenCalledWith(
        'https://example.com/data/test.json',
      );
      expect(result).toEqual(mockJsonData);
    });

    it('should throw NotFoundException when axios fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(
        service.scrapeJsonFromPage('https://example.com'),
      ).rejects.toThrow(NotFoundException);

      expect(fileDownloader.downloadJson).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when response status is not 200', async () => {
      (axios.get as jest.Mock).mockResolvedValue({
        status: 404,
        data: '',
      });

      await expect(
        service.scrapeJsonFromPage('https://example.com'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException when no JSON link is found', async () => {
      const mockHtml = '<p>No links here</p>';

      (axios.get as jest.Mock).mockResolvedValue({
        status: 200,
        data: mockHtml,
      });

      const mockElement = {
        attr: jest.fn().mockReturnValue(undefined),
        length: 0,
      };

      const mock$ = jest.fn().mockReturnValue(mockElement);
      (cheerio.load as jest.Mock).mockReturnValue(mock$);

      await expect(
        service.scrapeJsonFromPage('https://example.com'),
      ).rejects.toThrow(NotFoundException);

      expect(fileDownloader.downloadJson).not.toHaveBeenCalled();
    });

    it('should handle multiple JSON links and use the first one', async () => {
      const mockHtml = `
        <a href="/first.json">First</a>
        <a href="/second.json">Second</a>
      `;

      (axios.get as jest.Mock).mockResolvedValue({
        status: 200,
        data: mockHtml,
      });

      const mockElement = {
        attr: jest.fn().mockReturnValue('/first.json'),
        length: 2,
      };

      const mock$ = jest.fn().mockReturnValue(mockElement);
      (cheerio.load as jest.Mock).mockReturnValue(mock$);

      fileDownloader.downloadJson.mockResolvedValue({ data: 'test' });

      await service.scrapeJsonFromPage('https://example.com');

      expect(fileDownloader.downloadJson).toHaveBeenCalledWith(
        'https://example.com/first.json',
      );
    });

    it('should throw NotFoundException when download fails', async () => {
      const mockHtml = '<a href="/data.json">Download</a>';

      (axios.get as jest.Mock).mockResolvedValue({
        status: 200,
        data: mockHtml,
      });

      const mockElement = {
        attr: jest.fn().mockReturnValue('/data.json'),
        length: 1,
      };

      const mock$ = jest.fn().mockReturnValue(mockElement);
      (cheerio.load as jest.Mock).mockReturnValue(mock$);

      fileDownloader.downloadJson.mockRejectedValue(
        new Error('Download failed'),
      );

      await expect(
        service.scrapeJsonFromPage('https://example.com'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
