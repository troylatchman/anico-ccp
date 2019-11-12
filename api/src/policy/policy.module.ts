import { Module, HttpModule } from '@nestjs/common';
import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';
import { ConfigService } from '../config/config.service';

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
  ],
})
export class PolicyModule {}
