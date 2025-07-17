import Loadable from '@shared/utils/loadable';

export const ArtisanCourierPlanAndCountsTable = Loadable(() => {
  return import('./ArtisanCourierPlanAndCountsTable');
});

export const CourierPlanAndCountsTable = Loadable(() => {
  return import('./CourierPlanAndCountsTable');
});

export const OverallStats = Loadable(() => {
  return import('./OverallStats');
});

export const ActiveOrders = Loadable(() => {
  return import('./ActiveOrders');
});

export const CourierInfoTable = Loadable(() => {
  return import('./CourierInfoTable');
});

export const WarehouseInfoTable = Loadable(() => {
  return import('./WarehouseInfoTable');
});

export const WarehousesStats = Loadable(() => {
  return import('./WarehousesStats');
});

export const RedBasketInfoTable = Loadable(() => {
  return import('./RedBasketInfoTable');
});

export const ArtisanActiveOrders = Loadable(() => {
  return import('./ArtisanActiveOrders');
});

export const ArtisanActiveReturns = Loadable(() => {
  return import('./ArtisanActiveReturns');
});

export const TotalCourierCountsTable = Loadable(() => {
  return import('./TotalCourierCountsTable');
});

export const TotalCourierCountsByLocationTable = Loadable(() => {
  return import('./TotalCourierCountsByLocationTable');
});
