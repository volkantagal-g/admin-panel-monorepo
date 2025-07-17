import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('@app/pages/CommunicationBulkSms/List/components/Header'));
export const BulkSmsFilter = Loadable(() => import('@app/pages/CommunicationBulkSms/List/components/Filter'));
export const BulkSmsListTable = Loadable(() => import('@app/pages/CommunicationBulkSms/List/components/Table'));
