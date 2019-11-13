import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { PolicyLookupDTO } from './dto/policy-lookup.dto';
import { ConfigService } from '../config/config.service';
import { AxiosError, AxiosResponse } from 'axios';
import { EccsBillingResponse } from './types/eccs-response/get-billing';
import { GetBillingDTO } from './dto/response/get-billing.dto';

@Injectable()
export class PolicyService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
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
