import { createUseStyles } from 'react-jss';

export default createUseStyles({
  noFieldMargin: { '& .ant-form-item': { margin: '0 0 8px 0' } },
  noCellPadding: { '& .ant-table-cell': { padding: '8px 16px' } },
});
