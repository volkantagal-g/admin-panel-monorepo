import { createUseStyles } from 'react-jss';

export default createUseStyles({
  panel: {
    '& .ant-collapse-content-box': { padding: 0 },
    '& .ant-collapse-header': { padding: '12px 8px !important' },
  },
  formItem: { margin: 0, '& .ant-input-number': { width: '100%' } },
  confirmationModalHeader: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8 },
  confirmationModalTitle: { fontWeight: 700, fontSize: '16px' },
});
