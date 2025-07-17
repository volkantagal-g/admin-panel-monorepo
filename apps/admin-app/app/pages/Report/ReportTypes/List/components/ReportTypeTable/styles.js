import { createUseStyles } from 'react-jss';

export default createUseStyles({
  antTable: {
    '& div.ant-table-body': { maxHeight: '100% !important' },
    '& td': { padding: '2px 4px !important' },
    '& th': { padding: '2px 4px !important' },
  },
  fullWidth: { width: '100%' },
  activenessTag: {
    color: 'white',
    width: '70px',
    textAlign: 'center',
  },
  activeReportTag: { backgroundColor: 'green' },
  inactiveReportTag: { backgroundColor: 'red' },
});
