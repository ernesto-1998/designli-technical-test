import { Test, TestingModule } from '@nestjs/testing';
import { SesController } from './ses.controller';
import { SesService } from '../service/ses.service';
import { emailResponseDtoMock, sesSnsEventMock } from '../mocks';
import { DmarcPolicy, SesVerdictStatus } from 'src/common/enums';

describe('SesController', () => {
  let sesController: SesController;
  let sesService: jest.Mocked<SesService>;

  beforeEach(async () => {
    const mockSesService = {
      validate: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SesController],
      providers: [
        {
          provide: SesService,
          useValue: mockSesService,
        },
      ],
    }).compile();

    sesController = module.get<SesController>(SesController);
    sesService = module.get(SesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(sesController).toBeDefined();
  });

  it('should call sesService.validate with correct parameters', () => {
    sesService.validate.mockReturnValue(emailResponseDtoMock);
    const result = sesController.validate(sesSnsEventMock);

    expect(sesService.validate).toHaveBeenCalledWith(sesSnsEventMock);
    expect(sesService.validate).toHaveBeenCalledTimes(1);
    expect(result).toEqual(emailResponseDtoMock);
  });
});
