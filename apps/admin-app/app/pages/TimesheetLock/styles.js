import { createUseStyles } from 'react-jss';

export default createUseStyles({
  unlockedDateCell: {
    backgroundColor: 'darkgray',
    color: '#fff',
    '&:hover': { backgroundColor: '#5d3ebc' },
  },
  lockedDateCell: {
    backgroundColor: 'lightgray',
    color: '#fff',
    '&:hover': { backgroundColor: '#5d3ebc' },
  },
  datePicker: { '& .ant-picker-cell-disabled .ant-picker-cell-inner': { color: 'darkgray' } },
});
