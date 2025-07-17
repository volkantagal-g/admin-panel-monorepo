import { createUseStyles } from 'react-jss';

import { isMobile } from '@shared/utils/common';
import { SIDEBAR_Z_INDEX } from '@shared/constants/styling';
import { SIDEBAR_WIDTH_OPEN } from '@shared/containers/App/AppLayout/constants';

export default createUseStyles({
  selectDropdown: { zIndex: SIDEBAR_Z_INDEX - 1, maxWidth: isMobile() ? '100vh' : `calc(100vh - ${SIDEBAR_WIDTH_OPEN})` },
  dropdownHiddenTrigger: {
    height: '1px',
    width: '100%',
  },
  menuNoData: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50px',
    cursor: 'revert',
    '& *': { cursor: 'revert' },
  },
  menuWithData: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '50vh',
    overflow: 'auto',
    paddingLeft: '0.5rem',
  },
  menuItem: {
    cursor: 'revert',
    // content span inside
    '& > *': { display: 'flex', cursor: 'revert', textWrap: 'wrap' },
  },
  menuItemIcon: { fontSize: '1.5rem', color: '#5d3ebc' },
  menuItemLinkWithInfo: {
    '& > *': {
      display: 'flex',
      '@media (max-width: 768px)': { flexDirection: 'column' },
    },
  },
  docName: { margin: '0 4px', fontSize: '1rem' },
  boldLabel: { margin: '0 4px', fontWeight: 600 },
});
