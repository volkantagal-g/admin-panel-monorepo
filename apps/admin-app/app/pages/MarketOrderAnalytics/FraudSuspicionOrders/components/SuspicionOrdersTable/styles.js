import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    orderTable: {
      '& div.ant-table-body': { maxHeight: '100% !important' },
      '& th.ant-table-cell': { padding: '2px !important', fontWeight: 'bold' },
      '& td.ant-table-cell': { padding: '2px !important' },
    },
  };
});
