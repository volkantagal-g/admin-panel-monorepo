import { createUseStyles } from 'react-jss';

import { SIDEBAR_Z_INDEX } from '@shared/constants/styling';

export default createUseStyles(theme => ({
  diffTable: {
    '& td': {
      verticalAlign: 'top',
      minWidth: '40px',
      border: '1px solid #e8e8e8',
      padding: '5px',
      maxWidth: '600px',
      overflowX: 'auto',
    },
    '& th': { border: '1px solid #e8e8e8', padding: '5px', textAlign: 'center' },
  },
  modalWrapper: {
    zIndex: SIDEBAR_Z_INDEX + 1,
    '& .ant-modal': { width: 'max-content !important' },
  },
  changeLogTitleHeader: { marginBottom: '0 !important' },
  // @ts-ignore // theme.spacing does exist.
  alert: { padding: theme.spacing(1) },
}));
