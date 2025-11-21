import { Test, TestingModule } from '@nestjs/testing';
import { EmailResponseMapper } from './email-response.mapper';
import { sesSnsEventMock } from '../mocks';
import { SesVerdictStatus } from 'src/common/enums';
import { isPass } from '../helpers/ses.helpers';
import {
  extractMonthFromTimestamp,
  extractUsernameFromEmail,
} from 'src/common/utils';

jest.mock('../helpers/ses.helpers', () => ({
  isPass: jest.fn(),
}));

jest.mock('src/common/utils', () => ({
  extractMonthFromTimestamp: jest.fn(),
  extractUsernameFromEmail: jest.fn(),
}));

describe('EmailResponseMapper', () => {
  let mapper: EmailResponseMapper;

  beforeEach(async () => {
    (isPass as jest.Mock).mockImplementation(
      (status: SesVerdictStatus) => status === SesVerdictStatus.PASS,
    );

    (extractMonthFromTimestamp as jest.Mock).mockReturnValue('September');
    (extractUsernameFromEmail as jest.Mock).mockImplementation(
      (email: string) => email.split('@')[0],
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailResponseMapper],
    }).compile();

    mapper = module.get<EmailResponseMapper>(EmailResponseMapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(mapper).toBeDefined();
  });

  describe('toResponseDto', () => {
    it('should map spam verdict correctly when PASS', () => {
      const result = mapper.toResponseDto(sesSnsEventMock);
      expect(result.spam).toBe(true);
    });

    it('should map spam verdict correctly when FAIL', () => {
      const mockInput = {
        ...sesSnsEventMock,
        Records: [
          {
            ...sesSnsEventMock.Records[0],
            ses: {
              ...sesSnsEventMock.Records[0].ses,
              receipt: {
                ...sesSnsEventMock.Records[0].ses.receipt,
                spamVerdict: { status: SesVerdictStatus.FAIL },
              },
            },
          },
        ],
      };

      const result = mapper.toResponseDto(mockInput);
      expect(result.spam).toBe(false);
    });

    it('should map virus verdict correctly when PASS', () => {
      const result = mapper.toResponseDto(sesSnsEventMock);
      expect(result.virus).toBe(true);
    });

    it('should map virus verdict correctly when FAIL', () => {
      const mockInput = {
        ...sesSnsEventMock,
        Records: [
          {
            ...sesSnsEventMock.Records[0],
            ses: {
              ...sesSnsEventMock.Records[0].ses,
              receipt: {
                ...sesSnsEventMock.Records[0].ses.receipt,
                virusVerdict: { status: SesVerdictStatus.FAIL },
              },
            },
          },
        ],
      };

      const result = mapper.toResponseDto(mockInput);
      expect(result.virus).toBe(false);
    });

    it('should map dns as true when all DNS checks pass', () => {
      const result = mapper.toResponseDto(sesSnsEventMock);
      expect(result.dns).toBe(true);
    });

    it('should map dns as false when spfVerdict fails', () => {
      const mockInput = {
        ...sesSnsEventMock,
        Records: [
          {
            ...sesSnsEventMock.Records[0],
            ses: {
              ...sesSnsEventMock.Records[0].ses,
              receipt: {
                ...sesSnsEventMock.Records[0].ses.receipt,
                spfVerdict: { status: SesVerdictStatus.FAIL },
              },
            },
          },
        ],
      };

      const result = mapper.toResponseDto(mockInput);
      expect(result.dns).toBe(false);
    });

    it('should map dns as false when dkimVerdict fails', () => {
      const mockInput = {
        ...sesSnsEventMock,
        Records: [
          {
            ...sesSnsEventMock.Records[0],
            ses: {
              ...sesSnsEventMock.Records[0].ses,
              receipt: {
                ...sesSnsEventMock.Records[0].ses.receipt,
                dkimVerdict: { status: SesVerdictStatus.FAIL },
              },
            },
          },
        ],
      };

      const result = mapper.toResponseDto(mockInput);
      expect(result.dns).toBe(false);
    });

    it('should map dns as false when dmarcVerdict fails', () => {
      const mockInput = {
        ...sesSnsEventMock,
        Records: [
          {
            ...sesSnsEventMock.Records[0],
            ses: {
              ...sesSnsEventMock.Records[0].ses,
              receipt: {
                ...sesSnsEventMock.Records[0].ses.receipt,
                dmarcVerdict: { status: SesVerdictStatus.FAIL },
              },
            },
          },
        ],
      };

      const result = mapper.toResponseDto(mockInput);
      expect(result.dns).toBe(false);
    });

    it('should extract month from timestamp', () => {
      (extractMonthFromTimestamp as jest.Mock).mockReturnValue('October');

      const result = mapper.toResponseDto(sesSnsEventMock);
      expect(extractMonthFromTimestamp).toHaveBeenCalledWith(
        '2015-09-11T20:32:33.936Z',
      );
      expect(result.mes).toBe('October');
    });

    it('should map retrasado as false when processingTimeMillis <= 1000', () => {
      const mockInput = {
        ...sesSnsEventMock,
        Records: [
          {
            ...sesSnsEventMock.Records[0],
            ses: {
              ...sesSnsEventMock.Records[0].ses,
              receipt: {
                ...sesSnsEventMock.Records[0].ses.receipt,
                processingTimeMillis: 222,
              },
            },
          },
        ],
      };

      const result = mapper.toResponseDto(mockInput);
      expect(result.retrasado).toBe(false);
    });

    it('should map retrasado as false when processingTimeMillis = 1000', () => {
      const mockInput = {
        ...sesSnsEventMock,
        Records: [
          {
            ...sesSnsEventMock.Records[0],
            ses: {
              ...sesSnsEventMock.Records[0].ses,
              receipt: {
                ...sesSnsEventMock.Records[0].ses.receipt,
                processingTimeMillis: 1000,
              },
            },
          },
        ],
      };

      const result = mapper.toResponseDto(mockInput);
      expect(result.retrasado).toBe(false);
    });

    it('should map retrasado as true when processingTimeMillis > 1000', () => {
      const mockInput = {
        ...sesSnsEventMock,
        Records: [
          {
            ...sesSnsEventMock.Records[0],
            ses: {
              ...sesSnsEventMock.Records[0].ses,
              receipt: {
                ...sesSnsEventMock.Records[0].ses.receipt,
                processingTimeMillis: 1500,
              },
            },
          },
        ],
      };

      const result = mapper.toResponseDto(mockInput);
      expect(result.retrasado).toBe(true);
    });

    it('should extract username from emisor email', () => {
      const username = '61967230-7A45-4A9D-BEC9-87CBCF2211C9';
      (extractUsernameFromEmail as jest.Mock).mockReturnValue(username);

      const result = mapper.toResponseDto(sesSnsEventMock);
      expect(extractUsernameFromEmail).toHaveBeenCalledWith(
        '61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com',
      );
      expect(result.emisor).toBe(username);
    });

    it('should map complete DTO with all fields', () => {
      (extractMonthFromTimestamp as jest.Mock).mockReturnValue('September');
      (extractUsernameFromEmail as jest.Mock)
        .mockReturnValueOnce('61967230-7A45-4A9D-BEC9-87CBCF2211C9')
        .mockReturnValueOnce('recipient');

      const result = mapper.toResponseDto(sesSnsEventMock);

      expect(result).toEqual({
        spam: true,
        virus: true,
        dns: true,
        mes: 'September',
        retrasado: false,
        emisor: '61967230-7A45-4A9D-BEC9-87CBCF2211C9',
        receptor: ['recipient'],
      });
    });

    it('should process only the first record', () => {
      const mockInput = {
        ...sesSnsEventMock,
        Records: [
          ...sesSnsEventMock.Records,
          {
            ...sesSnsEventMock.Records[0],
            ses: {
              ...sesSnsEventMock.Records[0].ses,
              mail: {
                ...sesSnsEventMock.Records[0].ses.mail,
                source: 'second@example.com',
              },
            },
          },
        ],
      };

      (extractUsernameFromEmail as jest.Mock)
        .mockReturnValueOnce('61967230-7A45-4A9D-BEC9-87CBCF2211C9')
        .mockReturnValueOnce('recipient');

      const result = mapper.toResponseDto(mockInput);

      expect(result.emisor).toBe('61967230-7A45-4A9D-BEC9-87CBCF2211C9');
      expect(extractUsernameFromEmail).not.toHaveBeenCalledWith(
        'second@example.com',
      );
    });
  });
});
