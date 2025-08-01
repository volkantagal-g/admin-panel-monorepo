import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('./Header'));
export const Filter = Loadable(() => import('./Filter'));
export const Stats = Loadable(() => import('./Stats'));
export const OrderTable = Loadable(() => import('./OrderTable'));
export const ProductsListModal = Loadable(() => import('@shared/containers/ProductsListModal'));
