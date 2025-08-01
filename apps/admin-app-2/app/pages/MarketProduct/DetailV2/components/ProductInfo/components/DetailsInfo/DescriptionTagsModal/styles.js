import { createUseStyles } from 'react-jss';

export default createUseStyles({
  tableContainer: {
    '& .ant-table-content': {
      height: 500,
      overflowY: 'auto',
    },
    '& .ant-table-thead .ant-table-selection-column .ant-checkbox-wrapper': { display: 'none' },
  },
});
