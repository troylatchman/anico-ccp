import {
  Module,
  HttpModule,
  OnModuleInit,
  HttpService,
  Inject,
} from '@nestjs/common';
import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';
import { ConfigService } from '../config/config.service';
import { LoggerModule, Loggers } from '../logger/logger.module';
import { setupAxiosLogging } from '../logger/axios.logging.interceptor';
import { Logger } from 'winston';

@Module({
  controllers: [PolicyController],
  providers: [PolicyService],
  imports: [
    HttpModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        headers: {
          authorization: config.eccsAuthorizationHeader,
          'x-ibm-client-id': config.eccsIbmClientId,
        },
        baseURL: config.eccsBaseUrl,
      }),
      inject: [ConfigService],
    }),
    LoggerModule,
  ],
})
export class PolicyModule implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    @Inject(Loggers.eccs) private readonly eccsLogger: Logger,
  ) {}

  onModuleInit() {
    setupAxiosLogging(this.httpService, this.eccsLogger);
  }
}
