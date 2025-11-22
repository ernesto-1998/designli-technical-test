import { Test, TestingModule } from '@nestjs/testing';
import { EmlReaderService } from './eml-reader.service';

describe('EmlReaderService', () => {
  let service: EmlReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmlReaderService],
    }).compile();

    service = module.get<EmlReaderService>(EmlReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
