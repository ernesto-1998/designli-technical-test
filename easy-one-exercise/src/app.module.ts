import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SesModule } from './modules/ses/ses.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filter';

@Module({
  imports: [SesModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
