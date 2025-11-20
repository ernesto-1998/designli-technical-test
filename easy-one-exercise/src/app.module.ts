import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SesModule } from './modules/ses/ses.module';

@Module({
  imports: [SesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
