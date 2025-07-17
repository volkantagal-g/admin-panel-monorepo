import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('@app/pages/ArtisanOrder/Filter/components/Header'));

export const ArtisanOrderFilter = Loadable(() => import('@app/pages/ArtisanOrder/Filter/components/Filter'));

export const ArtisanOrderFilterTable = Loadable(() => import('@app/pages/ArtisanOrder/Filter/components/Table'));
