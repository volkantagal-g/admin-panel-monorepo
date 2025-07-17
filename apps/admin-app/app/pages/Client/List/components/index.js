import Loadable from '@shared/utils/loadable';

export const Filter = Loadable(() => import('@app/pages/Client/List/components/Filter'));
export const Table = Loadable(() => import('@app/pages/Client/List/components/Table'));
