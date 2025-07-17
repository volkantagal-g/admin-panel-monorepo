import { createUseStyles } from 'react-jss';

export default createUseStyles({
  container: { marginBottom: 10, width: '100%' },
  table: {
    touchAction: 'none',
    width: '100%',
    '& table': { width: '100% !important' },
    '& .ant-table-expanded-row-fixed': { width: '100% !important' },
  },
});
