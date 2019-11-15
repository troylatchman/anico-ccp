import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { PolicyModule } from './policy/policy.module';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { ResponseLoggingMiddleware } from './logger/response.logging.middleware';
import { PolicyController } from './policy/policy.controller';

@Module({
  imports: [BooksModule, PolicyModule, ConfigModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseLoggingMiddleware).forRoutes(PolicyController);
  }
}
