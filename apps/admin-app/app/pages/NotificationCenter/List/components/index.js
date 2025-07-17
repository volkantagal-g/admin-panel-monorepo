import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('@app/pages/NotificationCenter/List/components/Header'));
export const NotificationCenterFilter = Loadable(() => import('@app/pages/NotificationCenter/List/components/Filter'));
export const NotificationCenterListTable = Loadable(() => import('@app/pages/NotificationCenter/List/components/Table'));
