import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { PolicyLookupDTO } from './dto/policy-lookup.dto';
import { PolicyService } from './policy.service';

@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}
  @Post('/billing')
  @HttpCode(200)
  async billing(@Body() policyLookupDTO: PolicyLookupDTO) {
    return this.policyService.billing(policyLookupDTO);
  }
}
