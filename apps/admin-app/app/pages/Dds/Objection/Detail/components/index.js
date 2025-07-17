import Loadable from '@shared/utils/loadable';

export const Footer = Loadable(() => {
  return import('./Footer');
});

export const RejectReasonModal = Loadable(() => {
  return import('./RejectReasonModal');
});

export const LogInfoCard = Loadable(() => {
  return import('./LogInfoCard');
});

export const OrderInfoCard = Loadable(() => {
  return import('./OrderInfoCard');
});

export const WaybillsInfoCard = Loadable(() => {
  return import('./WaybillsInfoCard');
});

export const ReasonInfoCard = Loadable(() => {
  return import('./ReasonInfoCard');
});
