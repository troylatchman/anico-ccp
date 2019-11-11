import { Module, HttpModule } from '@nestjs/common';
import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';
import { ConfigModule } from '../config/config.module';

@Module({
  controllers: [PolicyController],
  providers: [PolicyService],
  imports: [HttpModule, ConfigModule],
})
export class PolicyModule {}
