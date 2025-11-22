import { Test, TestingModule } from '@nestjs/testing';
import { FileDownloaderService } from './file-downloader.service';
import { BadRequestException } from '@nestjs/common';
import axios from 'axios';

describe('FileDownloaderService', () => {
  const mockGet = jest.fn();
  let service: FileDownloaderService;

  beforeEach(async () => {
    jest.spyOn(axios, 'get').mockImplementation(mockGet);
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileDownloaderService],
    }).compile();

    service = module.get(FileDownloaderService);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return JSON when response is 200 and data is an object', async () => {
    const url = 'https://example.com/data.json';

    mockGet.mockResolvedValue({
      status: 200,
      data: { ok: true },
    });

    const result = await service.downloadJson(url);
    expect(result).toEqual({ ok: true });
    expect(mockGet).toHaveBeenCalledWith(url, {
      responseType: 'json',
      timeout: 15000,
      validateStatus: expect.any(Function),
    });
  });

  it('should throw BadRequestException when status is not 200', async () => {
    const url = 'https://example.com/fail';

    mockGet.mockResolvedValue({
      status: 404,
      data: {},
    });

    await expect(service.downloadJson(url)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException when response data is not an object', async () => {
    const url = 'https://example.com/invalid-json';

    mockGet.mockResolvedValue({
      status: 200,
      data: 'not-json',
    });

    await expect(service.downloadJson(url)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException when axios throws an error', async () => {
    const url = 'https://example.com/error';

    mockGet.mockRejectedValue(new Error('Network error'));

    await expect(service.downloadJson(url)).rejects.toThrow(
      BadRequestException,
    );
  });
});
