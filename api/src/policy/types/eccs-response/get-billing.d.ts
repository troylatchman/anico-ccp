export interface EccsBillingResponse {
  GetBillingServiceResponse: GetBillingServiceResponse;
}
export interface GetBillingServiceResponse {
  BillingResponse: BillingResponse;
  BillingRequest: BillingRequest;
}
export interface BillingResponse {
  ReturnCode: string;
  ReturnMessage: string;
  PaymentAmt: string;
  PaymentMode: string;
  PaymentModeDesc: string;
  PaymentMethod: string;
  PaymentMethodDesc: string;
  AccountNumber: string;
  RoutingNumber: string;
  CreditCardType: string;
  CreditCardExpireDate: string;
  BankAcctType: string;
  AcctHolderName1: string;
  AcctHolderName2: string;
  TransitReferenceNumber: string;
  BillingControlNumber: string;
  BillingMediaCode: string;
  EffectiveDate: string;
  NextBillingDate: string;
  CurrentBillDue: string;
  PaidToDate: string;
  CurrentlyBillingInd: string;
  GovernmentAllotmentType: string;
  BillingDay: string;
  BillingUseCode: string;
}
export interface BillingRequest {
  CompanyCode: string;
  PolicyNumber: string;
  AdminSystem: string;
}
