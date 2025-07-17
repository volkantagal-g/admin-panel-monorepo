import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('@app/pages/TransactionalSms/List/components/Header'));
export const TransactionalSmsFilter = Loadable(() => import('@app/pages/TransactionalSms/List/components/Filter'));
export const TransactionalSmsListTable = Loadable(() => import('@app/pages/TransactionalSms/List/components/Table'));
