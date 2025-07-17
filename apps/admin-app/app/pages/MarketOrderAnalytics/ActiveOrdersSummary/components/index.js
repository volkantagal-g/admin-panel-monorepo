import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('./Header'));
export const Filter = Loadable(() => import('./Filter'));
export const ChartFilters = Loadable(() => import('./ChartFilters'));
export const PieCharts = Loadable(() => import('./PieCharts'));
export const StatCards = Loadable(() => import('./StatCards'));
export const PromoTable = Loadable(() => import('./PromoTable'));
export const ProductsListModal = Loadable(() => import('@shared/containers/ProductsListModal'));
