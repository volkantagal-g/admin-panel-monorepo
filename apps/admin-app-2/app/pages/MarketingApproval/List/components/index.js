import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('@app/pages/MarketingApproval/List/components/Header'));
export const MarketingApprovalFilter = Loadable(() => import('@app/pages/MarketingApproval/List/components/Filter'));
export const MarketingApprovalListTable = Loadable(() => import('@app/pages/MarketingApproval/List/components/Table'));
