import Loadable from '@shared/utils/loadable';

export const TagStatuses = Loadable(() => {
  return import('./TagStatuses');
});

export const OrderInfoCard = Loadable(() => {
  return import('./OrderInfoCard');
});

export const OrderAddress = Loadable(() => {
  return import('./OrderAddress');
});

export const TimelineOrder = Loadable(() => {
  return import('./TimelineOrder');
});

export const OrderNote = Loadable(() => {
  return import('./OrderNote');
});

export const OrderMap = Loadable(() => {
  return import('./OrderMap');
});

export const ClientFeedback = Loadable(() => {
  return import('./ClientFeedbackTable');
});

export const OrderFeedback = Loadable(() => {
  return import('./OrderFeedbackTable');
});

export const ForbiddenMatch = Loadable(() => {
  return import('./ForbiddenMatch');
});

export const BasketLogs = Loadable(() => {
  return import('./BasketLogs');
});

export const OrderActions = Loadable(() => {
  return import('./OrderActions');
});

export const InvoiceInfo = Loadable(() => {
  return import('./InvoiceInfo');
});

export const ProductList = Loadable(() => {
  return import('./ProductList');
});

export const PartialRefundList = Loadable(() => {
  return import('./PartialRefundList');
});

export const OrderActionButtons = Loadable(() => {
  return import('./OrderActionButtons');
});

export const BatchedOrderList = Loadable(() => {
  return import('./BatchedOrderList');
});

export const SubscriptionBenefitInfoTable = Loadable(() => {
  return import('./SubscriptionBenefitInfoTable');
});
export const ChangeDeliverySlotModal = Loadable(() => {
  return import('./ChangeDeliverySlotModal');
});
export const CancelMarketOrderModal = Loadable(() => {
  return import('./CancelMarketOrderModal');
});

export const OrderJson = Loadable(() => {
  return import('./OrderJson');
});
