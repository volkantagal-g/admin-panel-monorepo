import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const DetailForm = Loadable(() => {
  return import('./DetailForm');
});

export const ExpirationStatusForm = Loadable(() => {
  return import('./ExpirationStatusForm');
});

export const IndefiniteExpirationForm = Loadable(() => {
  return import('./IndefiniteExpirationForm');
});
