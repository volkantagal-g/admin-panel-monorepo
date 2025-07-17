import Loadable from '@shared/utils/loadable';

export const TagStatuses = Loadable(() => {
  return import('./tagStatuses');
});

export const ActionsMenu = Loadable(() => {
  return import('./actionsMenu');
});

export const OrderMap = Loadable(() => {
  return import('./orderMap');
});

export const TimelineOrder = Loadable(() => {
  return import('./timelineOrder');
});

export const OrderAddress = Loadable(() => {
  return import('./orderAddress');
});

export const InsightInquiryTable = Loadable(() => {
  return import('./insightInquiryTable');
});

export const FoodUserTable = Loadable(() => {
  return import('./foodUserTable');
});

export const OrderChangeStatusTable = Loadable(() => {
  return import('./orderChangeStatusTable');
});

export const IvrActionsTable = Loadable(() => {
  return import('./ivrActionsTable');
});

export const PartialRefundTable = Loadable(() => {
  return import('./partialRefundTable');
});

export const RefundInfoTable = Loadable(() => {
  return import('./refundInfoTable');
});

export const CartInfoTable = Loadable(() => {
  return import('./cartInfoTable');
});

export const FoodProductTable = Loadable(() => {
  return import('./foodProductTable');
});

export const CardSections = Loadable(() => {
  return import('./cardSections');
});

export const OrderNote = Loadable(() => {
  return import('./orderNote');
});

export const ForbiddenMatches = Loadable(() => {
  return import('./forbiddenMatches');
});

export const GetirSubsDiscountTable = Loadable(() => {
  return import('./getirSubsDiscountTable');
});

export const PromoDetailLink = Loadable(() => {
  return import('./promoDetailLink');
});
