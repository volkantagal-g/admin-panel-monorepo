import Loadable from '@shared/utils/loadable';

export const MarketOrderRatingOptions = Loadable(() => {
  return import('./List');
});
