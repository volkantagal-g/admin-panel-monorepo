import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('@app/pages/Announcement/List/components/Header'));
export const AnnouncementFilter = Loadable(() => import('@app/pages/Announcement/List/components/Filter'));
export const AnnouncementListTable = Loadable(() => import('@app/pages/Announcement/List/components/Table'));
