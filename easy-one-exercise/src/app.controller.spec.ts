import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Developer Info"', () => {
      expect(appController.getHello()).toBe(
        JSON.stringify({
          message: 'Welcome to Easy One Exercise API!',
          developer: 'Ernesto Magaña',
          version: '1.0.0',
          portfolio: 'https://ernestopalacios.netlify.app/',
          lastProject: 'https://github.com/ernesto-1998/recipe-sharing-nestapp',
        }),
      );
    });
  });
});
