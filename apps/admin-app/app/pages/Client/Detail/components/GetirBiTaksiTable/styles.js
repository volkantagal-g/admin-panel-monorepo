import { createUseStyles } from 'react-jss';

export default createUseStyles({
  tableWrapper: {
    width: 'calc(100% - 2rem)',
    margin: '0 1rem 1rem',
  },
  noPanelPadding: {
    '& .ant-collapse-content-box': { padding: 0 },
    '& .ant-table-pagination': { marginRight: '16px' },
  },
});