import { createUseStyles } from 'react-jss';

export default createUseStyles({
  container: { marginBottom: 10 },
  table: {
    touchAction: 'none',
    width: '100%',
    '& table': { width: '100% !important' },
    '& .ant-table-expanded-row-fixed': { width: '100% !important' },
  },
  imageHolder: {
    minHeight: '40px',
    position: 'relative',
    '& img': { width: '85px', position: 'absolute', top: '0px' },
  },
  popover: { width: '0', height: '0px', '& img': { width: '290px', position: 'relative' } },
});
