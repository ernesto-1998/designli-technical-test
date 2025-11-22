import { Test, TestingModule } from '@nestjs/testing';
import { BodyParserService } from './body-parser.service';
import { ParsedMail } from 'mailparser';

describe('BodyParserService', () => {
  let service: BodyParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BodyParserService],
    }).compile();

    service = module.get<BodyParserService>(BodyParserService);
  });

  describe('extractJsonUrls', () => {
    it('should extract direct .json URLs from text and html', () => {
      const email: ParsedMail = {
        text: 'Report: https://example.com/data.json and also https://api.com/report.json',
        html: '<p>Download: <a href="https://site.com/result.json">link</a></p>',
        headers: new Map(),
        headerLines: [],
        attachments: [],
      } as ParsedMail;

      const urls = service.extractJsonUrls(email);

      expect(urls).toEqual([
        'https://example.com/data.json',
        'https://api.com/report.json',
        'https://site.com/result.json',
      ]);
    });

    it('should return empty array when no .json URLs found', () => {
      const email: ParsedMail = {
        text: 'hello, visit https://google.com for more info.',
        html: '<p>No JSON here</p>',
        headers: new Map(),
        headerLines: [],
        attachments: [],
      } as ParsedMail;

      const urls = service.extractJsonUrls(email);

      expect(urls).toEqual([]);
    });

    it('should ignore .json URLs with query params or fragments', () => {
      const email: ParsedMail = {
        text: 'Link: https://example.com/file.json',
        html: '',
        headers: new Map(),
        headerLines: [],
        attachments: [],
      } as ParsedMail;

      const urls = service.extractJsonUrls(email);

      expect(urls).toContain('https://example.com/file.json');
    });
  });

  describe('extractPageUrls', () => {
    it('should extract non-.json URLs (potential intermediate pages)', () => {
      const email: ParsedMail = {
        text: 'Report: https://banco.cl/reporte/12345 and also in https://app.com/view/abc',
        html: '<p>Here: <a href="https://portal.com/status/999">this link</a></p>',
        headers: new Map(),
        headerLines: [],
        attachments: [],
      } as ParsedMail;

      const urls = service.extractPageUrls(email);

      expect(urls).toEqual([
        'https://banco.cl/reporte/12345',
        'https://app.com/view/abc',
        'https://portal.com/status/999',
      ]);
    });

    it('should exclude URLs that end with .json', () => {
      const email: ParsedMail = {
        text: 'Here: https://example.com/data.json and also https://page.com/report',
        html: '<a href="https://final.com/result.json">no</a> <a href="https://landing.com">yes</a>',
        headers: new Map(),
        headerLines: [],
        attachments: [],
      } as ParsedMail;

      const urls = service.extractPageUrls(email);

      expect(urls).toEqual(['https://page.com/report', 'https://landing.com']);
      expect(urls).not.toContain('https://example.com/data.json');
      expect(urls).not.toContain('https://final.com/result.json');
    });

    it('should return empty array when no URLs at all', () => {
      const email: ParsedMail = {
        text: 'no links on this email.',
        html: '<p>Plane text</p>',
        headers: new Map(),
        headerLines: [],
        attachments: [],
      } as ParsedMail;

      const urls = service.extractPageUrls(email);

      expect(urls).toEqual([]);
    });

    it('should handle emails with only html or only text', () => {
      const emailTextOnly: ParsedMail = {
        text: 'Link: https://example.com/page',
        html: '',
        headers: new Map(),
        headerLines: [],
        attachments: [],
      } as ParsedMail;

      const emailHtmlOnly: ParsedMail = {
        text: '',
        html: '<a href="https://site.com/dashboard">ir</a>',
        headers: new Map(),
        headerLines: [],
        attachments: [],
      } as ParsedMail;

      expect(service.extractPageUrls(emailTextOnly)).toEqual([
        'https://example.com/page',
      ]);
      expect(service.extractPageUrls(emailHtmlOnly)).toEqual([
        'https://site.com/dashboard',
      ]);
    });
  });
});
