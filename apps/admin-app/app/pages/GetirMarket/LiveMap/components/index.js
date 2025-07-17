import Loadable from '@shared/utils/loadable';

export const Filter = Loadable(() => import('./Filter'));
export const TheMap = Loadable(() => import('./TheMap'));
export const CourierStatsPanel = Loadable(() => import('./CourierStatsPanel'));
export const OrderStatsPanel = Loadable(() => import('./OrderStatsPanel'));
export const EventPanel = Loadable(() => import('./EventPanel'));
