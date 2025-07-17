import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const Form = Loadable(() => {
  return import('./Form');
});

export const PromoUsageInfo = Loadable(() => {
  return import('./PromoUsageInfo');
});
