import Loadable from '@shared/utils/loadable';

export const CancelFoodOrderModal = Loadable(() => {
  return import('./cancelFoodOrderModal');
});

export const AddOrderExchangeStatusModal = Loadable(() => {
  return import('./addOrderExchangeStatusModal');
});

export const ComplaintRefundModal = Loadable(() => {
  return import('./ComplaintRefundModal');
});

export const SalesAgreement = Loadable(() => {
  return import('./salesAgreement');
});
