import Lodable from '@shared/utils/loadable';

export const CancelShopOrderModal = Lodable(() => {
  return import('./cancelShopOrderModal');
});

export const PartialRefundModal = Lodable(() => {
  return import('./partialRefundModal');
});

export const ShopPaybackModal = Lodable(() => {
  return import('./shopPaybackModal');
});

export const ShopPaymentModal = Lodable(() => {
  return import('./shopPaymentModal');
});

export const AddOrderExchangeStatus = Lodable(() => {
  return import('./addOrderExchangeStatus');
});

export const ShopRefundModal = Lodable(() => {
  return import('./shopRefundModal');
});
