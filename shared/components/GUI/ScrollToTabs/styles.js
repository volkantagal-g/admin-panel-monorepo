import { createUseStyles } from 'react-jss';

import { white, primary } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  tabs: {
    // to display below header
    top: 30,
    position: 'sticky',
    display: 'flex',
    gap: 20,
    transition: 'transform 0.3s',
    backgroundColor: white,
    zIndex: 2,
    boxShadow: 'rgba(28, 55, 90, 0.08) 0px -12px 20px 0px',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: '20px 0 0 24px',
  },
  tab: {
    position: 'relative',
    '& button': {
      padding: '12px 0',
      backgroundColor: 'transparent',
      border: 0,
      outline: 'none',
      '&:hover, &:active, &:focus': { backgroundColor: 'transparent' },
    },
  },
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    '& > div:first-child > div': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  },
  line: {
    width: ({ offsetWidth }) => offsetWidth ?? 0,
    left: ({ offsetLeft }) => offsetLeft ?? 0,
    height: 2,
    bottom: 0,
    position: 'absolute',
    background: primary,
    pointerEvents: 'none',
    transition: 'width 0.3s, left 0.3s, right 0.3s',
  },
});
