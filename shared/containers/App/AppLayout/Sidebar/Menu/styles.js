import { createUseStyles } from 'react-jss';

import { PROD_BG_COLOR_SOFT } from '@shared/containers/App/AppLayout/constants';

export default createUseStyles({
  menuWrapper: {
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingBottom: '3rem',
    height: '100%',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
    '& li.ant-menu-submenu > .ant-menu-title-content': { marginLeft: 0 },
    '& li.ant-menu-submenu > .ant-menu-title-content a': { marginLeft: 0 },
    '& li > .ant-menu-title-content a': { marginLeft: 0 },
    '& .ant-menu-title-content': {
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      paddingRight: '10px',
      marginLeft: 0,
      fontWeight: '700',
      lineHeight: '18px',
      paddingBottom: '2px',
      '@media (max-width: 768px)': { lineHeight: '28px' },
    },
    '& .ant-menu-item': { height: 'auto !important' },
    '& .ant-menu-inline.ant-menu-root .ant-menu-submenu-title > .ant-menu-title-content': {
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      paddingRight: '10px',
    },
    '& .ant-menu-submenu-title': { height: 'auto !important' },
    '& .ant-menu-submenu-arrow': { top: '13px' },
  },
  menuItemGroup: {
    '& > .ant-menu-item-group-title': {
      padding: '0px 0px 0px 3px',
      margin: '1px 0px 1px 0px',
      color: '#a6a8b1',
      cursor: 'auto',
      fontWeight: '400',
      borderTop: '2px solid #2e3344',
      fontSize: '14px',
    },
    '& > .ant-menu-item-group-list': { paddingLeft: '2px' },
  },
  topLevelMenuGroup: {
    '& > .ant-menu-submenu-title:first-child': {
      padding: '3px 3px 1px 3px!important',
      lineHeight: 1.5715,
      color: '#a6a8b1',
      '& .ant-menu-title-content': { fontWeight: 400 },

      borderTop: '2px solid #2e3344',
    },
    '&:first-child > .ant-menu-submenu-title:first-child': { borderTop: 'none' },

    '& > .ant-menu-sub span a': { fontWeight: '700!important' },
    '& > .ant-menu-sub .ant-menu-sub span a': { fontWeight: '400!important' }, // nested menues should not be bold
    '& > .ant-menu-sub': { background: '#3a3f51!important' },
    '& .ant-menu-item': {
      padding: '0 6px!important',
      lineHeight: '18px!important',
    },
    '& .ant-menu-submenu': { padding: '0 2px!important' },
  },
  favoritesTooltip: { pointerEvents: 'none' },
  favoriteButton: {
    position: 'fixed',
    width: 20,
    height: 20,
    background: '#2e3344',
    borderRadius: '0 6px 6px 0',
    borderStyle: 'none',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& > span': {
      paddingRight: 2,
      cursor: 'pointer',
    },
  },
  dropOverDownward: {
    boxSizing: 'content-box',
    borderBottom: `1.5px dashed ${PROD_BG_COLOR_SOFT}`,
  },
  dropOverUpward: {
    boxSizing: 'content-box',
    borderTop: `1.5px dashed ${PROD_BG_COLOR_SOFT}`,
  },
});
