import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('@app/pages/CommunicationHistory/components/Header'));
export const DashboardFilter = Loadable(() => import('@app/pages/CommunicationHistory/components/CommunicationHistoryFilter'));
export const DashboardTable = Loadable(() => import('@app/pages/CommunicationHistory/components/CommunicationHistoryTable'));
