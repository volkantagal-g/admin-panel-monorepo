import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('@app/pages/GetirFood/FilterOrders/components/Header'));

export const GetirFoodFilter = Loadable(() => import('@app/pages/GetirFood/FilterOrders/components/Filter'));

export const GetirFoodFilterTable = Loadable(() => import('@app/pages/GetirFood/FilterOrders/components/DataTable'));
