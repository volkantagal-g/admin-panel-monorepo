import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('@app/pages/TransactionalNotification/List/components/Header'));
export const TransactionalNotificationFilter = Loadable(() => import('@app/pages/TransactionalNotification/List/components/Filter'));
export const TransactionalNotificationListTable = Loadable(() => import('@app/pages/TransactionalNotification/List/components/Table'));
