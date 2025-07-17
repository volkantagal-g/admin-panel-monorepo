import { createUseStyles } from 'react-jss';

export default createUseStyles({
  antTable: {
    '& div.ant-table-body': { maxHeight: '100% !important' },
    '& th.ant-table-cell': { padding: '2px !important' },
    '& td.ant-table-cell': { padding: '2px !important' },
  },
});
