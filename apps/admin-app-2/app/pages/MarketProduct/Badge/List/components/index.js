import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const BadgeListTable = Loadable(() => {
  return import('./BadgeListTable');
});

export const MarketProductBadgeListTable = Loadable(() => {
  return import('./MarketProductBadgeListTable');
});
