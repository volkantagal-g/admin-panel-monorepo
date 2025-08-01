import { createUseStyles } from 'react-jss';

export default createUseStyles({
  checkBoxGroup: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    gap: 4,
  },
  checkBoxMenu: { height: 200, overflow: 'auto', background: '#fff', padding: 8 },
  overflowList: { maxHeight: 125, overflowY: 'auto', overflowX: 'hidden' },
});
