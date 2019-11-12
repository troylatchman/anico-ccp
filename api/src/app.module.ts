import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { PolicyModule } from './policy/policy.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [BooksModule, PolicyModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
