import permKey from '@shared/shared/permKey.json';

import PageList from './PageList';
import PanelDocList from './PanelDocList';
import RoleList from './RoleList';

export const SEARCH_TAB = {
  PAGES: 'pages',
  ROLES: 'roles',
  PANEL_DOCS: 'panelDocs',
  // Add more here
};

export const SEARCH_TAB_TRANSLATION_KEY = {
  [SEARCH_TAB.PAGES]: 'PAGES',
  [SEARCH_TAB.ROLES]: 'ROLES',
  [SEARCH_TAB.PANEL_DOCS]: 'DOCUMENTATIONS',
  // Add more here
};

export const SEARCH_TABS = Object.values(SEARCH_TAB);

export const SEARCH_TAB_TO_LIST_COMPONENT = {
  [SEARCH_TAB.PAGES]: PageList,
  [SEARCH_TAB.ROLES]: RoleList,
  [SEARCH_TAB.PANEL_DOCS]: PanelDocList,
  // Add more components here, component will recieve
  // "searchText", "debouncedSearchText", "validatedSearchText", "isActive" props.
};

export const SEARCH_TAB_TO_ACCESS_KEY = {
  [SEARCH_TAB.PAGES]: permKey.PAGE_PAGE_LIST,
  [SEARCH_TAB.ROLES]: permKey.PAGE_ROLE_LIST,
  [SEARCH_TAB.PANEL_DOCS]: permKey.PAGE_PANEL_DOC_SEARCH,
  // Add more here
};
