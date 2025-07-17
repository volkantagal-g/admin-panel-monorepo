import { createUseStyles } from 'react-jss';

import { primary } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  drawer: {
    '& .ant-drawer-header': {
      padding: '16px 24px',
      borderBottom: '1px solid #E6E1E5',
    },
    '& .ant-drawer-title': {
      fontSize: '20px',
      fontWeight: 600,
      color: '#1D1B20',
    },
    '& .ant-drawer-body': { padding: 0 },
  },
  drawerContent: {
    height: '100%',
    overflow: 'auto',
  },
  drawerExtra: {
    display: 'flex',
    gap: '12px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#49454F',
    margin: '0 24px 16px',
  },
  cancelButton: {
    height: '36px !important',
    padding: '0 16px !important',
    fontSize: '14px !important',
    fontWeight: '500 !important',
    borderRadius: '8px !important',
    background: '#F4EFF4 !important',
    borderColor: 'transparent !important',
    color: `${primary} !important`,
    '&:hover': {
      background: '#E8DEF8 !important',
      borderColor: 'transparent !important',
    },
  },
  saveButton: {
    height: '36px !important',
    padding: '0 16px !important',
    fontSize: '14px !important',
    fontWeight: '500 !important',
    borderRadius: '8px !important',
  },
} as const);
