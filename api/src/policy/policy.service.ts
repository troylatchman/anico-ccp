import { Injectable, HttpService, HttpException, Inject } from '@nestjs/common';
import { PolicyLookupDTO } from './dto/policy-lookup.dto';
import { ConfigService } from '../config/config.service';
import { AxiosError, AxiosResponse } from 'axios';
import { EccsBillingResponse } from './types/eccs-response/get-billing';
import { GetBillingDTO } from './dto/response/get-billing.dto';
import { Logger } from 'winston';
import { Loggers } from '../logger/logger.module';

@Injectable()
export class PolicyService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    @Inject(Loggers.ccp) private readonly ccpLogger: Logger,
    @Inject(Loggers.eccs) private readonly eccsLogger: Logger,
  ) {}

  handleAxiosError(error: AxiosError) {
    if (error.response) {
      throw new HttpException(error.response.data, error.response.status);
    }
    throw error;
  }

  async billing(policyLookupDTO: PolicyLookupDTO) {
    try {
      const axiosResponse: AxiosResponse<
        EccsBillingResponse
      > = await this.httpService
        .post('/billingapi/billinggetdata', policyLookupDTO)
        .toPromise();
      const eccsData = axiosResponse.data;
      return new GetBillingDTO(eccsData);
    } catch (error) {
      this.handleAxiosError(error);
    }
  }
}
