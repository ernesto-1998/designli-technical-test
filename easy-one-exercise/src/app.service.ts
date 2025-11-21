import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return JSON.stringify({
      message: 'Welcome to Easy One Exercise API!',
      developer: 'Ernesto Magaña',
      version: '1.0.0',
      portfolio: 'https://ernestopalacios.netlify.app/',
      lastProject: 'https://github.com/ernesto-1998/recipe-sharing-nestapp',
    });
  }
}
