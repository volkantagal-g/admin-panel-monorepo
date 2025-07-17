import { createUseStyles } from 'react-jss';

import {
  DEVELOPMENT_BG_COLOR, DEVELOPMENT_BG_COLOR_SOFT,
  HEADER_ACTIONS_HEIGHT, HEADER_HIGHT, PROD_BG_COLOR_SOFT, SIDEBAR_WIDTH_OPEN_MOBILE,
} from '../constants';

import { SIDEBAR_Z_INDEX } from '@shared/constants/styling';

export default createUseStyles(theme => ({
  appHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'fixed',
    width: '100%',
    top: 0,
    alignItems: 'center',
    height: HEADER_HIGHT,
    padding: '0 .5rem 0 .5rem',
    zIndex: SIDEBAR_Z_INDEX - 2,
    paddingLeft: props => props.sidebarWidth,
    backgroundColor: props => (props.isDev ? DEVELOPMENT_BG_COLOR : theme.color.primary),
    transition: 'all 0.2s',
    // Note: This is to make header slide with sidebar on mobile, 0 => 0, 180px => 75vw
    '@media (max-width: 768px)': { paddingLeft: props => (props.sidebarWidth && SIDEBAR_WIDTH_OPEN_MOBILE) },
  },
  appHeaderRight: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    '& > *': {
      marginLeft: '0.25rem',
      marginRight: '0.25rem',
      padding: '0.1rem 0.45rem',
      border: 'none',
      borderRadius: '4px',
      height: HEADER_ACTIONS_HEIGHT,
      fontSize: '10px',
      color: 'white!important',
      backgroundColor: props => `${props.isDev ? DEVELOPMENT_BG_COLOR_SOFT : PROD_BG_COLOR_SOFT}!important`,
    },
    '& > :not(:last-child)': { marginLeft: '0.25rem' },
  },
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEADER_ACTIONS_HEIGHT,
    // hide on mobile when sidebar is open
    '@media (max-width: 768px)': { display: props => (props.sidebarWidth ? 'none' : 'flex') },
  },
  userButtonText: {
    color: 'inherit',
    marginLeft: 4,
  },
  userButtonArrow: { marginLeft: 4 },
  userLanguageButton: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    '& > :not(:last-child)': { marginRight: '0.25rem' },
    '@media (max-width: 768px)': { display: 'none' },
  },
  userLanguageButtonKey: {
    backgroundColor: 'white',
    color: props => (props.isDev ? DEVELOPMENT_BG_COLOR : theme.color.primary),
    borderRadius: '50%',
    padding: '0 0.25rem',
  },
  countrySelectionButton: {
    height: HEADER_ACTIONS_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    '& > :not(:last-child)': { marginRight: '0.25rem' },
    '@media (max-width: 768px)': { display: 'none' },
  },
  countryCode: {
    backgroundColor: 'white',
    color: props => (props.isDev ? DEVELOPMENT_BG_COLOR : theme.color.primary),
    borderRadius: '50%',
    padding: '0 .3rem',
  },
  profileMenu: {
    borderRadius: 6,
    padding: 0,
    '& > li > span': {
      display: 'flex',
      alignItems: 'center',
    },
    '& > li:first-child': {
      backgroundColor: '#5D3EBC0D',
      '&:hover': { backgroundColor: '#f5f5f5' },
    },
  },
  userProfileButton: { padding: 12 },
  profileMenuLink: { marginLeft: 8, color: '#0E0E0E !important' },
}));
