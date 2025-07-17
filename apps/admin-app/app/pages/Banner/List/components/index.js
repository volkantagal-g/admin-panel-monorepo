import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('@app/pages/Banner/List/components/Header'));
export const BannerFilter = Loadable(() => import('@app/pages/Banner/List/components/Filter'));
export const BannerListTable = Loadable(() => import('@app/pages/Banner/List/components/Table'));
