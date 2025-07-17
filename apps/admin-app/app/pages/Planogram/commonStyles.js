import { createUseStyles } from 'react-jss';

import { SIDEBAR_Z_INDEX } from '@shared/constants/styling';

export default createUseStyles({
  addNewDrawer: {
    '& .ant-drawer-content-wrapper': {
      '@media (max-width: 576px)': { width: '375px !important' },
      width: '576px !important',
    },
    '& .ant-drawer-body': {
      padding: '30px',
      backgroundColor: '#fff',
    },
    zIndex: SIDEBAR_Z_INDEX + 2,
  },
  divider: { margin: '12px 0' },
});
