import { createUseStyles } from 'react-jss';

import { SIDEBAR_Z_INDEX } from '@shared/constants/styling';

export default createUseStyles({
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
  table: {
    overflowX: 'auto',
    '& table': { width: '100% !important' },
    '& .ant-table-body': { overflowY: 'auto !important' },
  },
  tableHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& h5': { margin: 0 },
  },
  filterWrapper: { marginRight: '10px' },
});
