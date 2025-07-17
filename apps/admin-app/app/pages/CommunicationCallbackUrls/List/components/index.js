import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('@app/pages/CommunicationCallbackUrls/List/components/Header'));
export const CallbackUrlsFilter = Loadable(() => import('@app/pages/CommunicationCallbackUrls/List/components/Filter'));
export const CallbackUrlsListTable = Loadable(() => import('@app/pages/CommunicationCallbackUrls/List/components/Table'));
