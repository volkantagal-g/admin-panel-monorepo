import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('@app/pages/GetirFood/ActiveOrderSummary/components/Header');
});

export const ActiveOrder = Loadable(() => {
  return import('@app/pages/GetirFood/ActiveOrderSummary/components/ActiveOrder');
});

export const RestaurantStatus = Loadable(() => {
  return import('@app/pages/GetirFood/ActiveOrderSummary/components/RestaurantStatus');
});
