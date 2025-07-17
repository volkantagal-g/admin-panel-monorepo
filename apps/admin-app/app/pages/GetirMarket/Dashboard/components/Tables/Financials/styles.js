import { createUseStyles } from 'react-jss';

export default createUseStyles({
  antTableContainer: { height: 108 },
  table: {
    '& .ant-table.ant-table-small .ant-table-tbody > tr > td': {
      padding: '1px 2px !important',
      lineHeight: '15px',
    },
    '& .ant-table.ant-table-small .ant-table-thead > tr > th': {
      padding: '1px 2px !important',
      lineHeight: '15px',
    },
  },
});
