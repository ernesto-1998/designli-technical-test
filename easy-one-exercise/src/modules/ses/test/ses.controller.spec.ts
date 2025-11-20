import { Test, TestingModule } from '@nestjs/testing';
import { SesController } from '../controller/ses.controller';
import { SesService } from '../service/ses.service';

describe('SesController', () => {
  let controller: SesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SesController],
      providers: [SesService],
    }).compile();

    controller = module.get<SesController>(SesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
