import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('@app/pages/Popup/List/components/Header'));
export const GlobalRuleset = Loadable(() => import('@app/pages/Popup/List/components/GlobalRuleset'));
export const Filter = Loadable(() => import('@app/pages/Popup/List/components/Filter'));
export const PopupListTable = Loadable(() => import('@app/pages/Popup/List/components/Table'));
