import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { PolicyLookupDTO } from './dto/policy-lookup.dto';
import { ConfigService } from '../config/config.service';
import { AxiosError } from 'axios';

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
      const axiosResponse = await this.httpService
        .post('/billingapi/billinggetdata', policyLookupDTO)
        .toPromise();
      return axiosResponse.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }
}
