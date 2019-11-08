import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { PolicyLookupDTO } from './dto/policy-lookup.dto';

@Injectable()
export class PolicyService {
  constructor(private readonly httpService: HttpService) {}

  async billing(policyLookupDTO: PolicyLookupDTO) {
    try {
      const axiosResponse = await this.httpService
        .post(
          'https://apidev.americannational.com/american-national-dev/dev/billingapi/billinggetdata',
          policyLookupDTO,
          {
            headers: {
              authorization: 'Basic QU5DQ1BEOlBycGxhbjE5',
              'x-ibm-client-id': '8965372f-bedb-4d91-8732-2d1e49133e2a',
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
