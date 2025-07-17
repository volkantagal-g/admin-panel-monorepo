import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('@app/pages/Email/List/components/Header'));
export const EmailFilter = Loadable(() => import('@app/pages/Email/List/components/Filter'));
export const EmailListTable = Loadable(() => import('@app/pages/Email/List/components/Table'));
