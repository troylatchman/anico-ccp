import { Injectable, HttpService, HttpException, Inject } from '@nestjs/common';
import { PolicyLookupDTO } from './dto/policy-lookup.dto';
import { ConfigService } from '../config/config.service';
import { AxiosResponse } from 'axios';
import { EccsBillingResponse } from './types/eccs-response/get-billing';
import { GetBillingDTO } from './dto/response/get-billing.dto';
import { Logger } from 'winston';
import { Loggers } from '../logger/logger.module';
import { handleServiceError } from '../exception/exception.utils';

@Injectable()
export class PolicyService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    @Inject(Loggers.ccp) private readonly ccpLogger: Logger,
    @Inject(Loggers.eccs) private readonly eccsLogger: Logger,
  ) {}

  async billing(policyLookupDTO: PolicyLookupDTO) {
    try {
      // throw 5;
      // throw null;
      // throw undefined;
      // throw Symbol('hi');
      // throw new HttpException({ a: 5, b: 6 }, 500);
      // throw new Error('some error message');
      const axiosResponse: AxiosResponse<
        EccsBillingResponse
      > = await this.httpService
        .post('/billingapi/billinggetdata', policyLookupDTO)
        .toPromise();
      const eccsData = axiosResponse.data;
      return new GetBillingDTO(eccsData);
    } catch (error) {
      handleServiceError(error);
    }
  }
}
