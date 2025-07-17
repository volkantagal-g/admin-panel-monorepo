import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const TagStatuses = Loadable(() => {
  return import('./tagStatuses');
});

export const OrderAdress = Loadable(() => {
  return import('./orderAddress');
});

export const CardSections = Loadable(() => {
  return import('./cardSections');
});

export const OrderMap = Loadable(() => {
  return import('./orderMap');
});

export const WaterUserTable = Loadable(() => {
  return import('./waterUserTable');
});

export const ActionsMenu = Loadable(() => {
  return import('./actionsMenu');
});

export const RefundTable = Loadable(() => {
  return import('./refundTable');
});

export const PaymentCardInfo = Loadable(() => {
  return import('./paymentCardInfo');
});

export const ProductsList = Loadable(() => {
  return import('./productsList');
});

export const IvrActionList = Loadable(() => {
  return import('./ivrActionList');
});

export const TimelineOrder = Loadable(() => {
  return import('./timelineOrder');
});

export const OrderNote = Loadable(() => {
  return import('./orderNote');
});
