import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { PolicyLookupDTO } from './dto/policy-lookup.dto';
import { ConfigService } from '../config/config.service';

@Injectable()
export class PolicyService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async billing(policyLookupDTO: PolicyLookupDTO) {
    try {
      const axiosResponse = await this.httpService
        .post(
          `${this.config.eccsBaseUrl}/billingapi/billinggetdata`,
          policyLookupDTO,
          {
            headers: {
              authorization: this.config.eccsAuthorizationHeader,
              'x-ibm-client-id': this.config.eccsIbmClientId,
            },
          },
        )
        .toPromise();
      return axiosResponse.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }
      throw error;
    }
  }
}
