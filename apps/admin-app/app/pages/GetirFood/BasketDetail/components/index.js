import Loadable from '@shared/utils/loadable';

export const TagStatuses = Loadable(() => import('./tagStatuses'));

export const OrderMap = Loadable(() => import('./orderMap'));

export const OrderAddress = Loadable(() => import('./orderAddress'));

export const CardSections = Loadable(() => import('./cardSections'));

export const TimelineOrder = Loadable(() => import('./timelineOrder'));

export const FoodUserTable = Loadable(() => import('./foodUserTable'));

export const FoodProductTable = Loadable(() => import('./foodProductTable'));

export const CartInfoTable = Loadable(() => import('./cartInfoTable'));
