import { Module, HttpModule } from '@nestjs/common';
import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';

@Module({
  controllers: [PolicyController],
  providers: [PolicyService],
  imports: [HttpModule],
})
export class PolicyModule {}
