import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { PolicyModule } from './policy/policy.module';

@Module({
  imports: [BooksModule, PolicyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
