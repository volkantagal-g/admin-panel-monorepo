import { createUseStyles } from 'react-jss';

import { SIDEBAR_Z_INDEX } from '@shared/constants/styling';

export default createUseStyles({
  appSidebar: {
    overflow: 'hidden',
    width: '150px !important',
    minWidth: '150px !important',
    height: '100%',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: SIDEBAR_Z_INDEX,
    '@media (max-width: 768px)': {
      width: '75vw !important',
      minWidth: '75vw !important',
    },
  },
  collapsed: {
    width: '0px !important',
    minWidth: '0px !important',
    '@media (max-width: 768px)': {
      width: '0px !important',
      minWidth: '0px !important',
    },
  },
});
