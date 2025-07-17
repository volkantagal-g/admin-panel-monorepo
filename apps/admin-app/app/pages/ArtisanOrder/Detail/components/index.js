import Lodable from '@shared/utils/loadable';

export const ArtisanProductTable = Lodable(() => {
  return import('./artisanProductTable');
});

export const ArtisanUserTable = Lodable(() => {
  return import('./artisanUserTable');
});

export const CardSections = Lodable(() => {
  return import('./cardSections');
});

export const CartInfoTable = Lodable(() => {
  return import('./cartInfoTable');
});

export const ForbiddenMatches = Lodable(() => {
  return import('./forbiddenMatches');
});

export const IvrActionsTable = Lodable(() => {
  return import('./ivrActionsTable');
});

export const OrderAdress = Lodable(() => {
  return import('./orderAdress');
});

export const BatchedOrdersTable = Lodable(() => {
  return import('./batchedOrdersTable');
});

export const OrderNote = Lodable(() => {
  return import('./orderNote');
});

export const PartialRefundTable = Lodable(() => {
  return import('./partialRefundTable');
});

export const TagStatuses = Lodable(() => {
  return import('./tagStatuses');
});

export const ActionsMenu = Lodable(() => {
  return import('./actionsMenu');
});

export const TimelineOrder = Lodable(() => {
  return import('./timelineOrder');
});

export const TimelineRefund = Lodable(() => {
  return import('./timelineRefund');
});

export const RefundInfoTable = Lodable(() => {
  return import('./refundInfoTable');
});

export const SubscriptionInfoTable = Lodable(() => {
  return import('./subscriptionInfoTable');
});

export const Price = Lodable(() => {
  return import('./price');
});

export const BatchedReturnsTable = Lodable(() => {
  return import('./batchedReturnsTable');
});

export const OrderProgressBar = Lodable(() => {
  return import('./orderProgressBar');
});

export const OrderDetailMap = Lodable(() => {
  return import('./Map');
});
