import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { GlobalExceptionFilter } from './global-exception.filter';

describe('GlobalExceptionFilter', () => {
  let filter: GlobalExceptionFilter;

  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;
  let mockResponse: Response;
  let mockRequest: Request;
  let mockHost: ArgumentsHost;

  beforeEach(() => {
    filter = new GlobalExceptionFilter();

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    mockResponse = {
      status: mockStatus,
    } as unknown as Response;

    mockRequest = {
      url: '/test-url',
    } as unknown as Request;

    mockHost = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    } as ArgumentsHost;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle HttpException properly', () => {
    const exception = new HttpException(
      { message: 'Bad request', error: 'BadRequest' },
      HttpStatus.BAD_REQUEST,
    );

    filter.catch(exception, mockHost);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
        error: 'BadRequest',
        path: '/test-url',
      }),
    );
  });

  it('should handle HttpException with string response', () => {
    const exception = new HttpException(
      'Forbidden action',
      HttpStatus.FORBIDDEN,
    );

    filter.catch(exception, mockHost);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.FORBIDDEN);
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Forbidden action',
        error: 'Internal Server Error',
        path: '/test-url',
      }),
    );
  });

  it('should handle unknown exceptions', () => {
    const exception = new Error('Unhandled problem');

    filter.catch(exception, mockHost);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error: 'Internal Server Error',
        path: '/test-url',
      }),
    );
  });
});
