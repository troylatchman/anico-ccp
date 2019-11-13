import { EccsBillingResponse } from '../../../policy/types/eccs-response/get-billing';
import * as camelcaseKeys from 'camelcase-keys';
import { formatDate as formatDateString } from '../../../utils/transform';

export class GetBillingDTO {
  constructor(eccsResponse: EccsBillingResponse) {
    this.populate(eccsResponse);
    this.transform();
  }
  returnCode: string;
  returnMessage: string;
  paymentAmt: string;
  paymentMode: string;
  paymentModeDesc: string;
  paymentMethod: string;
  paymentMethodDesc: string;
  accountNumber: string;
  routingNumber: string;
  creditCardType: string;
  creditCardExpireDate: string;
  bankAcctType: string;
  acctHolderName1: string;
  acctHolderName2: string;
  transitReferenceNumber: string;
  billingControlNumber: string;
  billingMediaCode: string;
  effectiveDate: string;
  nextBillingDate: string;
  currentBillDue: string;
  paidToDate: string;
  currentlyBillingInd: string;
  governmentAllotmentType: string;
  billingDay: string;
  billingUseCode: string;
  eccsResponse: EccsBillingResponse;

  private populate(eccsResponse: EccsBillingResponse) {
    const eccsResponseCc: any = camelcaseKeys(eccsResponse, { deep: true });
    const eccsBillingResponseCc =
      eccsResponseCc.getBillingServiceResponse.billingResponse;
    Object.assign(this, eccsBillingResponseCc);
    this.eccsResponse = eccsResponse;
  }

  private transform() {
    this.currentBillDue = formatDateString(
      this.eccsResponse.GetBillingServiceResponse.BillingResponse
        .CurrentBillDue,
    );
  }
}
