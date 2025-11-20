import { Test, TestingModule } from '@nestjs/testing';
import { SesService } from '../service/ses.service';

describe('SesService', () => {
  let service: SesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SesService],
    }).compile();

    service = module.get<SesService>(SesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
