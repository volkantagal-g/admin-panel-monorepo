import { createUseStyles } from 'react-jss';

export default createUseStyles({
  sideBar: {
    height: 'calc(100vh - 124px)',
    backgroundColor: 'white',
    verticalAlign: 'middle',
    '& .ant-picker': { width: '100%' },
  },
  radioCard: { visibility: 'hidden' },
});
