import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller({ version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Info' })
  @ApiOkResponse({
    example: {
      message: 'Welcome to Easy One Exercise API!',
      developer: 'Ernesto Magaña',
      version: '1.0.0',
      portfolio: 'https://ernestopalacios.netlify.app/',
      lastProject: 'https://github.com/ernesto-1998/recipe-sharing-nestapp',
    },
  })
  @Get('me')
  getHello(): string {
    return this.appService.getHello();
  }
}
