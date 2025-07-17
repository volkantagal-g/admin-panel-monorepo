import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('@app/pages/Client/Detail/components/Header'));
export const LeftGridComponent = Loadable(() => import('@app/pages/Client/Detail/components/LeftGridComponent'));
export const RightGridComponent = Loadable(() => import('@app/pages/Client/Detail/components/RightGridComponent'));
export const MarketOrderTable = Loadable(() => import('@app/pages/Client/Detail/components/MarketOrderTable'));
export const FoodTable = Loadable(() => import('@app/pages/Client/Detail/components/FoodTable'));
export const LocalsTable = Loadable(() => import('@app/pages/Client/Detail/components/LocalsTable'));
export const GetirBiTaksiTable = Loadable(() => import('@app/pages/Client/Detail/components/GetirBiTaksiTable'));
export const WaterMarketplaceOrdersTable = Loadable(() => import('@app/pages/Client/Detail/components/WaterMarketplaceOrderTable'));
export const AgentBasedPermission = Loadable(() => import('@app/pages/Client/Detail/components/AgentBasedPermission'));
export const FinanceTable = Loadable(() => import('@app/pages/Client/Detail/components/GetirFinanceTable'));
export const GetirJobs = Loadable(() => import('@app/pages/Client/Detail/components/GetirJobs'));
