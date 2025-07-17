import Loadable from '@shared/utils/loadable';

export const AddressInfo = Loadable(() => import('./AddressInfo'));
export const BasketInfo = Loadable(() => import('./BasketInfo'));
export const BasketLogs = Loadable(() => import('./BasketLogs'));
export const ClientInfo = Loadable(() => import('./ClientInfo'));
export const ProductList = Loadable(() => import('./ProductList'));
export const StatusInfo = Loadable(() => import('./StatusInfo'));
export const StoreInfo = Loadable(() => import('./StoreInfo'));
