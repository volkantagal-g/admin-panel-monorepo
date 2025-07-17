import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('@app/pages/Sms/List/components/Header'));
export const SmsFilter = Loadable(() => import('@app/pages/Sms/List/components/Filter'));
export const SmsListTable = Loadable(() => import('@app/pages/Sms/List/components/Table'));
