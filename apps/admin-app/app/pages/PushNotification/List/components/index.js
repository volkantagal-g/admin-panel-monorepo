import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('@app/pages/PushNotification/List/components/Header'));

export const GlobalRuleset = Loadable(() => import('@app/pages/PushNotification/List/components/GlobalRuleset'));

export const Filter = Loadable(() => import('@app/pages/PushNotification/List/components/Filter'));

export const PushNotificationListTable = Loadable(() => import('@app/pages/PushNotification/List/components/Table'));

export const DownloadListModal = Loadable(() => import('@app/pages/PushNotification/List/components/DownloadListModal'));
